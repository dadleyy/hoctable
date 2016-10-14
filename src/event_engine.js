let id = 0;

function uuid() {
  return btoa(`li-${++id}`);
}

class Events {

  constructor() {
    this.listeners = [];
  }

  on(event_name, handler, context) {
    if(!event_name || "function" !== typeof handler) return -1;

    let {listeners} = this;
    let id = uuid();
    listeners.push({event_name, handler, id, context});
    return id;
  }

  off(id) {
    let {listeners} = this;
    let index = null;

    for(let i = 0, c = listeners.length; i < c; i++) {
      let {id} = listeners[i];
      if(id !== id) continue;
      index = i;
      break;
    }

    if(index === null) return -1;

    listeners.splice(index, 1);
    return id;
  }

  trigger(name, ...args) {
    let {listeners} = this;

    for(let i = 0, c = listeners.length; i < c; i++) {
      let {context, handler, event_name} = listeners[i];
      if(event_name === name) handler.apply(context, args);
    }
  }

}

export default Events;
