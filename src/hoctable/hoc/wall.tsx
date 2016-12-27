import utils from "hoctable/utils";
import Viewport from "hoctable/services/window";
import Popups from "hoctable/services/popups";
import * as React from "react";
import * as ReactDOM from "react-dom";


export interface DataLoadedCallback {
  (items : Array<any>) : void;
}

export interface WallDelegate {
  items : (callback : DataLoadedCallback) => void;
}

export interface WallProps {
  delegate : WallDelegate;
}

export interface WallItemProps {
  item : any;
}

export interface RenderedItem {
  item      : any;
  container : Element;
  uuid      : string;
}

export interface GridItemProps {
  item      : any;
  uuid      : string;
  highlight : (item : any) => void;
}

export const CLASSES = {
  WALL             : "hoctable__wall",
  WALL_CONTROLS    : "hoctable__wall-controls",
  WALL_VIEWPORT    : "hoctable__wall-viewport",
  WALL_ITEM        : "hoctable__wall-item",
  WALL_CLEARFIX    : "hoctable__wall-clearfix",
  WALL_ITEM_EVENTS : "hoctable__wall-item-events",
  WALL_HIGHLIGHT   : "hoctable__wall-highlight",
  WALL_ACTIVE_ITEM : "hoctable__wall-active-item"
}

export interface WallTimings {
  interval : number | null;
  debounce : number | null;
}

export interface TransitionAction {
  () : void;
}

export type TransitionInstruction = TransitionAction | null;
export type ComposedWall          = React.ComponentClass<WallProps>;
export type PreviewClass          = React.ComponentClass<WallItemProps>;
export type CardClass             = React.ComponentClass<WallItemProps>;

const MAX_COLUMNS    = 12;
const CYCLE_INTERVAL = 2500;
const DEBOUNCEMENT   = 300;

function cycle() {
  let {renderer, state, uuid_pool} = this;
  let {highlight: current} = renderer;
  let next     = current;
  let attempts = 0;

  let max_attempts = Math.max(uuid_pool.length, 300);

  while(next === current && attempts < max_attempts) {
    // attempt to randomly load a new item id to highlight
    let rand = Math.floor(Math.random() * uuid_pool.length) % uuid_pool.length;
    next = uuid_pool[rand];

    // get the rendered item and check location
    let {container} = renderer.find(next) as RenderedItem;
    let {top} = container.getBoundingClientRect();

    // if we're below the screen, foce skip
    if(top >= Viewport.dimensions().height)
      next = current;

    // safety first
    attempts++;
  }

  this.highlight(next);
}


export class TransitionTimings {
  private current : number | null;

  constructor() {
    this.current = null;
  }

  enqueue(handler : TransitionInstruction, context : any, delay = DEBOUNCEMENT) : void {
    let {current} = this;

    if(current !== null)
      clearTimeout(current);

    // no nothing if we were given nothing for our instruction
    if(handler === null)
      return;

    function exec() {
      handler.call(context);
    }

    this.current = setTimeout(exec, delay);
  }

  interval(handler : TransitionInstruction, context : any, delay = DEBOUNCEMENT) : number {
    let exec = () => this.enqueue(handler, context, 0);
    return setInterval(exec, delay);
  }

  stop(interval_id : number) : void {
    clearInterval(interval_id);
  }

}

function WallFactory(Preview : PreviewClass, Card : CardClass) : ComposedWall {

  class Renderer {
    public items     : Array<RenderedItem>;
    public clearfix  : HTMLElement;
    public active    : RenderedItem | null;
    public viewports : {list : HTMLElement, left: HTMLElement, right: HTMLElement};

    constructor(list : HTMLElement, left : HTMLElement, right : HTMLElement) {
      this.viewports = {list, left, right};
      this.items     = [];
      this.active    = null;
    }

    get size() : {width: number, height: number} {
      let {viewports} = this;

      if(!viewports.list)
        return {width: 0, height: 0};

      return viewports.list.getBoundingClientRect();
    }

    get highlight() : string | null {
      return this.active ? this.active.uuid : null;
    }

    set highlight(target_id : string | null) {
      let {viewports, items, active} = this;
      let {width: vw, height: vh} = Viewport.dimensions();
      let target = this.find(target_id);

      if(target === null && !active)
        return;

      if(target === null) {
        let {container} = active;
        ReactDOM.unmountComponentAtNode(container);
        utils.dom.remove(container);
        this.active = null;
        return;
      }

      let {uuid, item} = target;

      let {width, height, top, left, right} = target.container.getBoundingClientRect();
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

      style["backgroundColor"] = "red";

      // create container & render into
      let container = utils.dom.create("div", style, [CLASSES["WALL_ACTIVE_ITEM"]]);
      ReactDOM.render(<Card item={item} />, container);

      destination.appendChild(container);

      this.active = {container, uuid, item};
    }

    add(container : HTMLElement, item : any, uuid : string) {
      let {items, viewports} = this;
      viewports.list.appendChild(container);
      items.push({item, container, uuid});
    }

    seal() {
      let {viewports} = this;
      this.clearfix = utils.dom.create("div", {clear: "both"}, [CLASSES["WALL_CLEARFIX"]]);
      viewports.list.appendChild(this.clearfix);
    }

    find(target_id : string) : RenderedItem | null {
      let {items} = this;

      for(let i = 0, c = items.length; i < c; i++) {
        let item = items[i];
        if(item.uuid === target_id) return item;
      }

      return null;
    }

    clear() {
      let {viewports, items, clearfix} = this;

      if(clearfix)
        utils.dom.remove(clearfix);

      this.clearfix = null;

      while(items.length) {
        let {container} = items.shift();
        ReactDOM.unmountComponentAtNode(container);
        utils.dom.remove(container);
      }

      this.highlight = null;
      viewports.list.innerHTML = "";
    }

  }

  class GridItem extends React.Component<GridItemProps, any> {

    constructor(props) {
      super(props);
    }

    render() {
      let {props} = this;
      let {item, highlight, uuid} = props;

      let events = {
        onMouseOver : function() { highlight(uuid); },
        onMouseOut  : function() { highlight(null); }
      };

      return (<div className={CLASSES["WALL_ITEM"]} {...events}><Preview item={item} /></div>);
    }

  }

  class Wall extends React.Component<WallProps, any> {
    private subscriptions  : { [key:string]: string };
    private timings        : TransitionTimings;
    private renderers      : Array<Renderer>;
    private uuid_pool      : Array<string>;
    private cycle_interval : number | null;

    constructor(props : WallProps) {
      super(props);
      // create the state & prepare a store for subscriptions
      this.state         = {};
      this.subscriptions = {};

      // listen to the window for changes to the currently fullcreen-ed element
      // and make sure to update the state of this instance when we notice it
      // has been closed (we think open but no current on fullscreen).
      let fullscreen = () => {
        let {state, timings} = this;

        if(state.fullscreen === true && Viewport.fullscreen.current)
          return;

        let {renderer} = this;

        if(renderer)
          renderer.clear();

        if(!state.opening) {
          timings.stop(this.cycle_interval);
          return this.setState({fullscreen: false});
        }

        this.cycle_interval = timings.interval(cycle, this, CYCLE_INTERVAL);
        state.opening = false;
        this.setState({fullscreen: true});
      }

      // listen to full screen changes
      this.subscriptions["fullscreen"] = Viewport.on("fullscreen", fullscreen, this);

      this.timings   = new TransitionTimings();
      this.renderers = [];
      this.uuid_pool = [];
    }

    get renderer() : Renderer {
      let {renderers} = this;
      let [latest] = renderers;
      return latest;
    }

    componentWillUnmount() : void {
      let {subscriptions, timings, cycle_interval, renderer} = this;
      renderer.clear();
      timings.stop(cycle_interval);
      Viewport.off(subscriptions["fullscreen"]);
    }

    highlight(target_id : string | null) : void {
      let {state, timings, renderer, refs} = this;
      let target = target_id === null ? null : renderer.find(target_id);
      let {highlight: current} = renderer;

      function close() {
        renderer.highlight = null;
      }

      function open() {
        // clear out the existing highlight
        renderer.highlight = null;
        // set the new one to our target
        renderer.highlight = target_id;
      }

      // do nothing if we're not in full screen and there is nothing to open/close
      if(state.fullscreen !== true || (target === null && current === null))
        return;

      // if we were given a null item target and we currently have an active item, we need to clear
      // the existing action we have queued 
      if(target === null && current !== null)
        return timings.enqueue(close, this);

      // clear out whatever we're about to do
      timings.enqueue(null, null);

      if(current && current === target_id)
        return;

      timings.enqueue(open, this, current === null ? 0 : DEBOUNCEMENT);
    }

    transclude(items) {
      let {timings, props, renderer, state, uuid_pool, cycle_interval, refs} = this;
      let {delegate} = props;
      let {width, height} = renderer.size;
      let {fullscreen} = state;

      uuid_pool.length = 0;

      let highlight = (target_id : string | null) => {
        // if we're coming off an element, restart our cycle
        if(target_id === null) {
          this.cycle_interval = timings.interval(cycle, this, CYCLE_INTERVAL);
          return this.highlight(target_id);
        }

        // if we're coming onto an element, stop the cycle
        timings.stop(this.cycle_interval);
        this.highlight(target_id);
      }

      if(items.length === 0)
        return;

      let columns   = Math.min(MAX_COLUMNS, items.length);
      let box_width = Math.floor(width / columns);
      let gutter    = width - (box_width * columns);

      for(let i = 0, c = items.length; i < c; i++) {
        let item  = items[i];
        let uuid  = utils.uuid();

        let style = {
          "position" : "relative",
          "float"    : "left", 
          "width"    : `${box_width}px`, 
          "height"   : `${box_width}px`
        };

        // create the div to contain the item and the instance of the grid item itself
        let container = utils.dom.create("div", style, [CLASSES["WALL_ITEM"]]);
        let instance  = <GridItem item={item} highlight={highlight} uuid={uuid} />;

        ReactDOM.render(instance, container);
        renderer.add(container, item, uuid);
        uuid_pool.push(uuid);
      }

      renderer.seal();
    }

    render() {
      let {props, renderers, state, refs} = this;
      let {delegate} = props;

      let transclude = this.transclude.bind(this);
      let update     = this.setState.bind(this);

      let toggle = <a className={CLASSES["WALL_CONTROL_OUT"]} onClick={close}>exit</a>;
      let styles = {};

      function load(list_el) {
        let [latest]  = renderers;
        let left = refs["left"] as HTMLElement;
        let right = refs["right"] as HTMLElement;

        // if we previously had a renderer, clear it and remove it
        if(latest) {
          latest.clear();
          renderers.shift();
        }

        if(!list_el)
          return null;

        let renderer = new Renderer(list_el, left, right);
        renderers.push(renderer);
        delegate.items(transclude);
      }

      function close() {
        Viewport.fullscreen.open(null);
      }

      function open() {
        if(!refs["wall"]) return;
        state.opening = true;
        Viewport.fullscreen.open(refs["wall"] as Node);
      }

      if(state.fullscreen !== true)
        toggle = <a className={CLASSES["WALL_CONTROL_IN"]} onClick={open}>fullscreen</a>;

      if(state.fullscreen === true) {
        styles["wall"]     = {"position": "absolute", "width": "100%", "height": "100%", "left": "0", "top": "0"};
        styles["controls"] = {"position": "absolute", "zIndex": "3"};
        styles["left"]     = {"position": "absolute", "zIndex": "2", "width": "100%", "height": "0", "left": "0%"};
        styles["right"]    = {"position": "absolute", "zIndex": "2", "width": "0", "height": "100%", "right": "0%"};
        styles["viewport"] = {"position": "absolute", "zIndex": "1", "width": "100%", "height": "100%"};
      }

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
