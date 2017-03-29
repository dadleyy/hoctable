import {uuid} from "./util";

class Engine {

  constructor() {
    this.listeners = [];
  }

  on(handler) {
    let {listeners} = this;
    let id = uuid();
    listeners.push({id, handler});
    return id;
  }

  off(id) {
    let {listeners} = this;
    let new_list = [];

    for(let i = 0, c = listeners.length; i < c; i++) {
      if(listeners[i].id !== id) new_list.push(listeners[i]);
    }

    this.listeners = new_list;
  }

  publish() {
    let {listeners} = this;

    for(let i = 0, c = listeners.length; i < c; i++) {
      listeners[i].handler();
    }
  }

}

export default Engine;
