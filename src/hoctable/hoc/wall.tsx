import utils from "hoctable/utils";
import Viewport from "hoctable/services/window";
import Popups from "hoctable/services/popups";

import * as React from "react";
import * as ReactDOM from "react-dom";

export type DataLoadedCallback = (items : Array<any>) => void;
export type HighlightAction = (rendered_id : string | null) => void;
export type TransitionAction = () => void;

export interface WallDelegate {
  items     : (callback : DataLoadedCallback) => void;
  interval? : () => number;
  delay?    : () => number;
}

export interface WallProps {
  delegate : WallDelegate;
}

export interface WallItemProps {
  item : any;
}

export class ItemDelegate {
  item : any;

  private actions : { highlight : HighlightAction };

  constructor(item : any, highlight : HighlightAction) {
    this.actions = { highlight };
    this.item    = item;
  }

  highlight(rendered_id : string) : void {
    let {actions} = this;
    actions.highlight(rendered_id);
  }

}

export interface ViewportAxis {
  list  : HTMLElement;
  left  : HTMLElement;
  right : HTMLElement;
}

export interface RenderedItem {
  delegate  : ItemDelegate;
  container : Element;
  uuid      : string;
}

export interface GridItemProps {
  delegate : ItemDelegate;
  uuid     : string;
}

export const CLASSES = {
  WALL                 : "hoctable__wall",
  WALL_CONTROLS        : "hoctable__wall-controls",
  WALL_CONTROL_IN      : "hoctable__wall-control-in",
  WALL_CONTROL_OUT     : "hoctable__wall-control-out",
  WALL_VIEWPORT        : "hoctable__wall-viewport",
  WALL_ITEM            : "hoctable__wall-item",
  WALL_CLEARFIX        : "hoctable__wall-clearfix",
  WALL_ITEM_EVENTS     : "hoctable__wall-item-events",
  WALL_HIGHLIGHT       : "hoctable__wall-highlight",
  WALL_HIGHLIGHT_ITEM  : "hoctable__wall-highlight-item",
  WALL_ACTIVE_MODIFIER : "hoctable__wall-active-item"
};

export interface WallTimings {
  interval : number | null;
  debounce : number | null;
}

export type TransitionInstruction = TransitionAction | null;
export type ComposedWall          = React.ComponentClass<WallProps>;
export type PreviewClass          = React.ComponentClass<WallItemProps>;
export type CardClass             = React.ComponentClass<WallItemProps>;

export const MAX_COLUMNS      = 12;
export const CYCLE_INTERVAL   = 5000;
export const DEBOUNCEMENT     = 300;
export const FULLSCREEN_DELAY = 300;

export class TransitionTimings {
  private current     : number | null;
  private interval_id : number | null;

  constructor() {
    this.current = null;
  }

  enqueue(handler : TransitionInstruction, context : any, delay = DEBOUNCEMENT) : void {
    let { current } = this;

    if(current !== null) {
      clearTimeout(current);
    }

    // Do nothing if we were given nothing for our instruction.
    if(handler === null) {
      return;
    }

    function exec() : void {
      handler.call(context);
    }

    this.current = setTimeout(exec, delay);
  }

  interval(handler : TransitionInstruction, context : any, delay = DEBOUNCEMENT) : void {
    let { interval_id } = this;
    let exec = () => this.enqueue(handler, context, 0);

    if(interval_id !== null) {
      this.stop();
    }

    this.interval_id = setInterval(exec, delay);
  }

  stop() : void {
    let {interval_id} = this;
    clearInterval(interval_id);
    this.interval_id = null;
  }

}

export function GridItemFactory(Transclusion : PreviewClass) : React.ComponentClass<GridItemProps> {

  class GridItem extends React.Component<GridItemProps, any> {

    constructor(props) {
      super(props);
    }

    render() : React.ReactElement<any> {
      let { props } = this;
      let { delegate, uuid } = props;

      let events = {
        onMouseOver() : void { delegate.highlight(uuid); },
        onMouseOut() : void { delegate.highlight(null); }
      };

      return (<div className={CLASSES["WALL_ITEM"]} {...events}><Transclusion item={delegate.item} /></div>);
    }

  }

  return GridItem;

}

function WallFactory(Preview : PreviewClass, Card : CardClass) : ComposedWall {
  const GridItem = GridItemFactory(Preview);

  // Used during intervals, this function cycles the currently "highlighted" item randomly.
  function cycle() : void {
    let { renderer, state, uuid_pool, subscriptions } = this as Wall;

    // Stop if we've lost our renderer or have been unmounted
    if(!renderer || !subscriptions["fullscreen:error"] || !subscriptions["fullscreen:change"]) {
      return;
    }

    let { highlight: current } = renderer;
    let next      = current;
    let max_tries = Math.max(uuid_pool.length, 300);
    let attempts  = 0;

    // If there are no rendered items, do nothing.
    if(uuid_pool.length === 0) {
      return;
    }

    while(next === current && attempts < max_tries) {
      // Attempt to randomly load a new item id to highlight.
      let rand = Math.floor(Math.random() * uuid_pool.length) % uuid_pool.length;
      next = uuid_pool[rand];

      // Get the rendered item and check location
      let { container } = renderer.find(next) as RenderedItem;
      let { top } = container.getBoundingClientRect();

      // If we're below the screen, foce skip.
      if(top >= Viewport.dimensions().height) {
        next = current;
      }

      // Safety check.
      attempts++;
    }

    this.highlight(next);
  }

  /**
   * This class is responsible for positioning each item in the viewport as well as "opening" the highlighted
   * element during cycle intervals and user interactions.
   */
  class Renderer {
    rendered  : Array<RenderedItem>;
    clearfix  : HTMLElement;
    active    : RenderedItem | null;
    viewports : ViewportAxis;

    constructor(list : HTMLElement, left : HTMLElement, right : HTMLElement) {
      this.viewports = { list, left, right };
      this.rendered  = [];
      this.active    = null;
    }

    get size() : { width : number, height : number } {
      let { viewports } = this;

      if(!viewports.list) {
        return { width: 0, height: 0 };
      }

      return viewports.list.getBoundingClientRect();
    }

    get highlight() : string | null {
      return this.active ? this.active.uuid : null;
    }

    set highlight(rendered_id : string | null) {
      let { viewports, rendered, active } = this;
      let { width: vw, height: vh } = Viewport.dimensions();
      let source = this.find(rendered_id);

      // If the id sent in was null and there is no active highlight, do nothing.
      if(rendered_id === null && !active) {
        return;
      }

      // Unable to find the target element, abort.
      if(source === null) {
        return;
      }

      /* If the id sent in was null, it is time to clear out the existing highlight by unmounting the car, removing
       * the container from the dom and clearing out the active reference.
       */
      if(rendered_id === null) {
        let { container, uuid } = active;

        // Find the rendered grid item associated w/ the active highlight
        let grid_item = this.find(uuid);

        // Remove the modifier class from the related grid container
        if(grid_item) {
          utils.dom.classes.remove(grid_item.container as HTMLElement, CLASSES["WALL_ACTIVE_MODIFIER"]);
        }

        // Unmount the highlight container & remove the div created for it
        ReactDOM.unmountComponentAtNode(container);
        utils.dom.remove(container);

        this.active = null;

        return;
      }

      let { uuid, delegate, container: source_container } = source;

      // Add the active modifier class to the grid item for styling
      utils.dom.classes.add(source_container as HTMLElement, CLASSES["WALL_ACTIVE_MODIFIER"]);

      let { width, height, top, left, right } = source_container.getBoundingClientRect();
      let destination = viewports.left;
      let from_right  = left + width > vw * 0.5;
      let from_bottom = top + height > vh * 0.5;

      let style = {
        "position"  : "absolute",
        "top"       : `${top + height}px`,
        "left"      : `${left + width}px`,
        "minWidth"  : `${width}px`,
        "minHeight" : `${height}px`
      };

      if(from_right && !from_bottom) {
        style["left"]  = null;
        style["right"] = `${vw - (right - width)}px`;
      }

      else if(from_bottom && !from_right) {
        destination = viewports.right;
        style["left"]    = `-${vw - right}px`;
        style["top"]     = null;
        style["bottom"]  = `${vh - top}px`;
      }

      else if(from_bottom && from_right) {
        destination = viewports.right;
        style["left"]   = null;
        style["top"]    = null;
        style["bottom"] = `${vh - top}px`;
        style["right"]  = `${vw - (right - width)}px`;
      }

      // Create container & render into
      let container = utils.dom.create("div", style, [CLASSES["WALL_HIGHLIGHT_ITEM"]]);
      ReactDOM.render(<Card item={delegate.item} />, container);

      destination.appendChild(container);

      this.active = { container, uuid, delegate };
    }

    /* After having loaded in all of the items, the wall component will iterate over each, calling this function which
     * is expected to render an instance of our composed grid item and providing an "ItemDelegate" to each.
     *
     * It also returns a unique identifier that the wall can use to trigger highlights outside the events bound during
     * this function (mouseover mouseout).
     */
    add(delegate : ItemDelegate, style : any) : string {
      let { rendered, viewports } = this;
      let uuid = utils.uuid();

      // Create the div to contain the item and the instance of the grid item itself
      let container = utils.dom.create("div", style, [CLASSES["WALL_ITEM"]]);
      let instance  = <GridItem delegate={delegate} uuid={uuid} />;

      // Render the "grid item" into the container we've just created
      ReactDOM.render(instance, container);

      // Add the container (which has now had a component rendered into it) into the viewport
      viewports.list.appendChild(container);

      // Add the created information to our list of items
      rendered.push({ delegate, container, uuid });

      return uuid;
    }

    seal() : void {
      let { viewports } = this;
      this.clearfix = utils.dom.create("div", {clear: "both"}, [CLASSES["WALL_CLEARFIX"]]);
      viewports.list.appendChild(this.clearfix);
    }

    find(rendered_id : string) : RenderedItem | null {
      let { rendered } = this;

      for(let i = 0, c = rendered.length; i < c; i++) {
        let item = rendered[i];
        if(item.uuid === rendered_id) return item;
      }

      return null;
    }

    clear() : void {
      let { viewports, rendered, clearfix } = this;

      if(clearfix) {
        utils.dom.remove(clearfix);
      }

      this.clearfix = null;

      while(rendered.length) {
        let {container} = rendered.shift();
        ReactDOM.unmountComponentAtNode(container);
        utils.dom.remove(container);
      }

      this.highlight = null;
      viewports.list.innerHTML = "";
    }

  }

  class Wall extends React.Component<WallProps, any> {
    private timings   : TransitionTimings;
    private renderers : Array<Renderer>;

    subscriptions : { [key : string] : string };
    uuid_pool : Array<string>;

    constructor(props : WallProps) {
      super(props);

      // Create the state & prepare a store for subscriptions
      this.state         = {};
      this.subscriptions = {};

      const { delegate } = props;

      let launch = () : void => {
        const { subscriptions, timings } = this;

        // If we've been unmounted, do nothing!
        if(!subscriptions["fullscreen:change"]) {
          return;
        }

        const interval = typeof delegate.interval === "function" ? delegate.interval() : CYCLE_INTERVAL;
        timings.interval(cycle, this, interval);

        this.setState({ opening: false, fullscreen: true });
      };

      /* Listen to the window for changes to the currently fullcreen-ed element and make sure to update the state of
       * this instance when we notice it has been closed (we think open but no current on fullscreen).
       */
      const fullscreen_change = (event : any, errored : boolean = false) : void => {
        let { state, timings, subscriptions } = this;

        if(state.fullscreen === true && Viewport.fullscreen.current) {
          return;
        }

        if(!subscriptions["fullscreen:change"] || !subscriptions["fullscreen:error"]) {
          return;
        }

        const { renderer } = this;

        if(renderer) {
          renderer.clear();
        }

        timings.stop();

        // If we received a fullscreen change event but am not in the middle of opening, do essentially nothing.
        if(!state.opening) {
          return this.setState({ opening: false, fullscreen: false });
        }

        // If we're being called due to an error, keep track of it on the state
        state.fullscreen_error = errored ? event : null;
        timings.enqueue(launch, this, typeof delegate.delay === "function" ? delegate.delay() : FULLSCREEN_DELAY);
      };

      const fullscreen_error = (event : any) : void => {
        let { opening } = this.state;

        if(!opening) {
          return;
        }

        return fullscreen_change(event, true);
      };

      // Listen to full screen changes.
      this.subscriptions["fullscreen:change"] = Viewport.on("fullscreenchange", fullscreen_change);
      this.subscriptions["fullscreen:error"] = Viewport.on("fullscreenerror", fullscreen_error);

      this.timings   = new TransitionTimings();
      this.renderers = [];
      this.uuid_pool = [];
    }

    get renderer() : Renderer {
      let { renderers } = this;
      let [ latest ] = renderers;

      return latest;
    }

    componentWillUnmount() : void {
      let { subscriptions, timings, renderer } = this;
      renderer.clear();
      timings.stop();

      for(let key in subscriptions) {
        let id = subscriptions[key];
        Viewport.off(id);
        delete subscriptions[key];
      }
    }

    /* Called for every cycle interval as well as mouse interactions (on/off) on the grid items, this function is
     * responsible for opening the highlight view of the component.
     */
    highlight(rendered_id : string | null) : void {
      let { state, timings, renderer, refs } = this;
      let source = rendered_id === null ? null : renderer.find(rendered_id);
      let { highlight: current } = renderer;

      // If we were unable to find the target to highlight, exit now.
      if(!source) {
        return;
      }

      function close() : void {
        renderer.highlight = null;
      }

      function open() : void {
        // Clear out the existing highlight
        renderer.highlight = null;
        // Set the new one to our target
        renderer.highlight = rendered_id;
      }

      // Do nothing if we're not in full screen and there is nothing to open/close
      if(state.fullscreen !== true || (source === null && current === null)) {
        return;
      }

      /* If we were given a null item target and we currently have an active item, the caller is letting us know that
       * the highlighted item should no longer be highlighted - enqueue the close action.
       */
      if(source === null && current !== null) {
        return timings.enqueue(close, this);
      }

      // Clear out whatever we're about to do
      timings.enqueue(null, null);

      // If we have nothing to do because the target and the current highlight are the same, move on.
      if(current && current === rendered_id) {
        return;
      }

      /* If we have a valid target enqueue the "open" action with a delay in the event we have an existing highlight,
       * or immediately if there is no existing highlight.
       */
      timings.enqueue(open, this, current === null ? 0 : DEBOUNCEMENT);
    }

    /* Called once the delegate has loaded in it's items, this function handles iterating over the items, calculating
     * the positions for each and then rendering them onto the dom via it's active "renderer".
     */
    transclude(items : Array<any>) : void {
      let { timings, props, renderer, state, uuid_pool, refs } = this;
      let { delegate } = props;
      let { width, height } = renderer.size;
      let { fullscreen } = state;

      // If there are no items, do nothing else
      if(items.length === 0) {
        return;
      }

      let highlight = (rendered_id : string | null) => {
        // If we're coming off an element, restart our cycle
        if(rendered_id === null) {
          timings.interval(cycle, this, CYCLE_INTERVAL);

          return this.highlight(rendered_id);
        }

        // If we're coming onto an element, stop the cycle and highlight the item
        timings.stop();
        this.highlight(rendered_id);
      };

      // Prepare some information with which we will calculate positions
      let columns    = Math.min(MAX_COLUMNS, items.length);
      let aspect     = fullscreen ? width / (height || width) : 1.0;
      let rows       = Math.round(columns * (1 / aspect));
      let box_width  = Math.floor(width / columns);
      let box_height = fullscreen ? Math.floor(height / rows) : box_width;

      for(let i = 0, c = items.length; i < c; i++) {
        let item  = items[i];

        // Position it
        let style = {
          "position" : "relative",
          "float"    : "left",
          "width"    : `${box_width}px`,
          "height"   : `${box_height}px`
        };

        let item_delegate = new ItemDelegate(item, highlight);
        let uuid = renderer.add(item_delegate, style);
        uuid_pool.push(uuid);
      }

      renderer.seal();
    }

    render() : React.ReactElement<any> {
      let { props, renderers, state, refs, uuid_pool } = this;
      let { delegate } = props;

      let transclude = this.transclude.bind(this);

      let toggle = <a className={CLASSES["WALL_CONTROL_OUT"]} onClick={close}>exit</a>;
      let styles = {};

      /* Called as a react `ref` hook, this function will clear out the previous renderer instance (the class
       * responsible for actually rendering transclusions into the dom), and replace it with a new instance before
       * attempting to load in the delegate's items via the `items` hook.
       */
      function load(list_el : HTMLElement) : void {
        let [ latest ]  = renderers;
        let left = refs["left"] as HTMLElement;
        let right = refs["right"] as HTMLElement;

        // If for some reason our reference element was not found, skip it.
        if(!list_el) {
          return null;
        }

        // If we previously had a renderer, clear it and remove it
        if(latest) {
          latest.clear();
          renderers.shift();
        }

        let renderer = new Renderer(list_el, left, right);
        renderers.push(renderer);

        // Finally load in the delegate's items.
        delegate.items(transclude);
      }

      function close() : void {
        Viewport.fullscreen.open(null);
      }

      let open = () : void => {
        let { refs: current_refs, state: current_state } = this;
        let wall_element = current_refs["wall"];

        if(!wall_element) {
          return;
        }

        current_state.opening = true;
        Viewport.fullscreen.open(wall_element as Node);
      };

      // If we're not in full screen mode, render out our opener.
      if(state.fullscreen !== true) {
        toggle = <a className={CLASSES["WALL_CONTROL_IN"]} onClick={open}></a>;
      }

      /* If the component is in full screen mode, we need it to "consume" the screen using absolute positioning. The
       * other containers will also need to be absolutely positioned so that we can place elements in a fancy way.
       */
      if(state.fullscreen === true) {
        styles["wall"]     = {"position": "absolute", "width": "100%", "height": "100%", "left": "0", "top": "0"};
        styles["controls"] = {"position": "absolute", "zIndex": "3"};
        styles["left"]     = {"position": "absolute", "zIndex": "2", "width": "100%", "height": "0", "left": "0%"};
        styles["right"]    = {"position": "absolute", "zIndex": "2", "width": "0", "height": "100%", "right": "0%"};

        styles["viewport"] = {
          "position": state.fullscreen_error ? "fixed" : "absolute",
          "zIndex": "1",
          "width": "100%",
          "height": "100%"
        };
      }

      // Clear out all references to previously rendered items.
      uuid_pool.length = 0;

      return (
        <div className={CLASSES["WALL"]} style={styles["wall"]} ref="wall">
          <div className={CLASSES["WALL_HIGHLIGHT"]} style={styles["left"]} ref="left"></div>
          <div className={CLASSES["WALL_HIGHLIGHT"]} style={styles["right"]} ref="right"></div>
          <div className={CLASSES["WALL_CONTROLS"]} style={styles["controls"]}>{toggle}</div>
          <div className={CLASSES["WALL_VIEWPORT"]} style={styles["viewport"]} ref={load}></div>
        </div>
      );
    }

  }

  return Wall;

}

export default WallFactory;
