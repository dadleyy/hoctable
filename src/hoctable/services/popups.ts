import util from "hoctable/utils";
import Viewport from "hoctable/services/window";
import * as ReactDOM from "react-dom";
import * as React from "react";

export interface PopupPlacement {
  left   : number;
  right? : number;
  top    : number;
}

export interface PopupHandle {
  id   : string;
  node : HTMLElement;
}

export type PopupHandleReference = string | number;

export const GUTTER_WIDTH = 10;
export const SYNC_WAIT_TIME = 3;

class SyncGroup {
  private timeout : number | null;
  private pool    : Array<string>;

  constructor() {
    this.pool = [];
  }

  add(identifier : string) : void {
    const { timeout } = this;

    this.pool.push(identifier);

    if(timeout !== null) {
      clearTimeout(timeout);
    }

    this.timeout = setTimeout(this.flush.bind(this), SYNC_WAIT_TIME);
  }

  // After every addition of a new popup, this function will clear the list of opening poups.
  flush() : void {
    this.pool.length = 0;
  }

  /* This function is used during click events to check if the click event is associated with a popup that was opened
   * in the same click event process.
   */
  release(identifier : string) : boolean {
    const index = this.pool.indexOf(identifier);

    return index !== -1 ? !!this.pool.splice(index, 1) : false;
  }

}

export type PopupEventHandler = (any) => void;

export interface PopupEventListener {
  event_name : string;
  handler    : PopupEventHandler;
}

class InteralState {
  root           : Node;
  popups         : Array<PopupHandle>;
  subscriptions  : Array<string>;
  sync_group     : SyncGroup;
  event_handlers : Array<PopupEventListener>;

  constructor() {
    this.popups = [];
    this.subscriptions = [];
    this.sync_group = new SyncGroup();
    this.event_handlers = [];
  }

  publish(event_name : string, context : any) : void {
    const { event_handlers } = this;

    for(let i = 0, c = event_handlers.length; i < c; i++) {
      const { handler, event_name: name } = event_handlers[i];

      if(name !== event_name) {
        continue;
      }

      handler(context);
    }
  }
}

const internal_state = new InteralState();

function open(component : React.ReactElement<any>, placement : PopupPlacement) : PopupHandleReference {
  const { root, popups, sync_group } = internal_state;

  // Invalid open attempt - no mount point setup yet.
  if(!root) {
    internal_state.publish("error", new Error("popup service is not mounted"));

    return -1;
  }

  // Create the html style properties that will be assigned to the container.
  const style : React.CSSProperties = {
    top: `${placement.top}px`,
    right: `${placement.right}px`,
    position: "absolute"
  };

  // If the `left` property was provided and right was not, use left. This allows `right` to take precendence.
  if(placement.left && !placement.right) {
    style.left = `${placement.left}px`;
  }

  // Create the unique id for this popup and the container it will be rendered into.
  const id = util.uuid();
  const node = util.dom.create("div", style);

  // Render the component into the container and add it to our popup root.
  ReactDOM.render(component, node);
  root.appendChild(node);

  // Add a reference to our internal state manager and send the id to the sync group.
  popups.push({ id, node });
  sync_group.add(id);

  return id;
}

function close(popup_id : PopupHandleReference) : number {
  const { popups: open_popups } = internal_state;

  for(let i = 0, c = open_popups.length; i < c; i++) {
    const { id, node } = open_popups[i];

    if(id !== popup_id) {
      continue;
    }

    const dom_node = ReactDOM.findDOMNode(node);
    ReactDOM.unmountComponentAtNode(dom_node);
    dom_node.parentNode.removeChild(dom_node);
    open_popups.splice(i, 1);

    return 0;
  }

  return -1;
}

function closeOpen(trigger : Event) : number {
  const { popups: open_popups, sync_group } = internal_state;
  const { target } = trigger;

  // Iterate over our open popups closing those that are not associated with this event
  for(let i = 0, count = open_popups.length; i < count; i++) {
    const { id, node } = open_popups[i];
    const dom_node = ReactDOM.findDOMNode(node);

    // If this node is inside the target of the click - continue
    if(sync_group.release(id) || util.dom.contains(dom_node, target as Node)) {
      continue;
    }

    // Otherwise close it
    return close(id);
  }

  return 0;
}

function mount(target) : void {
  const { subscriptions } = internal_state;
  internal_state.root = target;

  for(let i = 0, c = subscriptions.length; i < c; i++) {
    Viewport.off(subscriptions[i]);
  }

  util.replace(subscriptions, [
    Viewport.on("isoclick", closeOpen),
    Viewport.on("touchstart", closeOpen),
    Viewport.on("escape", closeOpen)
  ]);
}

function unmount() : void {
  const { popups: open_popups } = internal_state;

  internal_state.root = null;

  while(open_popups.length) {
    close(open_popups[0].id);
  }
}

function on(event_name : string, handler : PopupEventHandler) : void {
  internal_state.event_handlers.push({ event_name, handler });
}

export default { open, close, mount, unmount, on };
