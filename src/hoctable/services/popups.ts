import util from "hoctable/utils";
import Viewport from "hoctable/services/window";
import * as ReactDOM from "react-dom";

export interface PopupPlacement {
  left   : number;
  right? : number;
  top    : number;
}

export interface PopupGlobalCloseEvent {
  target : Node
}

export interface PopupHandle {
  id   : string;
  node : HTMLElement;
}

export type PopupHandleReference = string | number;

export const GUTTER_WIDTH = 10;
export const SYNC_WAIT_TIME = 0;

class SyncGroup {
  private timeout : number | null;
  private pool    : Array<string>;

  constructor() {
    this.pool = [];
  }

  add(identifier : string) {
    let { timeout } = this;

    this.pool.push(identifier);

    if(timeout !== null) {
      clearTimeout(timeout);
    }

    this.timeout = setTimeout(this.flush.bind(this), SYNC_WAIT_TIME);
  }

  flush() {
    this.pool.length = 0;
  }

  // This function is used during click events to 
  release(identifier : string) : boolean {
    let index = this.pool.indexOf(identifier);
    return index !== -1 ? !!this.pool.splice(index, 1) : false;
  }

}

class InteralState {
  public root          : Node;
  public popups        : Array<PopupHandle>;
  public subscriptions : Array<string>;
  public sync_group    : SyncGroup;

  constructor() {
    this.popups = [];
    this.subscriptions = [];
    this.sync_group = new SyncGroup();
  }
}

let internal_state = new InteralState();

function open(component : React.ReactElement<any>, placement : PopupPlacement) : PopupHandleReference {
  let { root, popups, sync_group } = internal_state;

  // Invalid open attempt - no mount point setup yet.
  if(!root) {
    return -1;
  }

  // Create the html style properties that will be assigned to the container.
  let style : React.CSSProperties = {
    top: `${placement.top}px`,
    right: `${placement.right}px`,
    position: "absolute"
  };

  // If the `left` property was provided and right was not, use left. This allows `right` to take precendence.
  if(placement.left && !placement.right) {
    style.left = `${placement.left}px`;
  }


  // Create the unique id for this popup and the container it will be rendered into.
  let id = util.uuid();
  let node = util.dom.create("div", style);

  // Render the component into the container and add it to our popup root.
  ReactDOM.render(component, node);
  root.appendChild(node);

  // Add a reference to our internal state manager and send the id to the sync group.
  popups.push({ id, node });
  sync_group.add(id);
  return id;
}

function close(popup_id : PopupHandleReference) : number {
  let { popups: open_popups } = internal_state;

  for(let i = 0, c = open_popups.length; i < c; i++) {
    let { id, node } = open_popups[i];

    if(id !== popup_id) {
      continue;
    }

    let dom_node = ReactDOM.findDOMNode(node)
    ReactDOM.unmountComponentAtNode(dom_node);
    dom_node.parentNode.removeChild(dom_node);
    open_popups.splice(i, 1);

    return 0;
  }

  return -1;
}

function closeOpen(trigger : PopupGlobalCloseEvent) : number {
  let { popups: open_popups, sync_group } = internal_state;
  let { target } = trigger;

  // Iterate over our open popups closing those that are not associated with this event
  for(let i = 0, count = open_popups.length; i < count; i++) {
    let { id, node } = open_popups[i];
    let dom_node = ReactDOM.findDOMNode(node);

    // If this node is inside the target of the click - continue
    if(sync_group.release(id) || util.dom.contains(dom_node, target)) {
      continue;
    }

    // Otherwise close it
    return close(id);
  }

  return 0;
}

function mount(target) {
  let { subscriptions } = internal_state;
  internal_state.root = target;

  for(let i = 0, c = subscriptions.length; i < c; i++) {
    Viewport.off(subscriptions[i]);
  }

  util.replace(subscriptions, [Viewport.on("isoclick", closeOpen)]);
}

function unmount() {
  let { popups: open_popups } = internal_state;

  internal_state.root = null;

  while(open_popups.length) {
    close(open_popups[0].id);
  }
}

export default { open, close, mount, unmount };
