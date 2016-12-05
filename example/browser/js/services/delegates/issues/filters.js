import Engine from "../../events";
import i18n from "../../i18n";

class Filters extends Engine {

  constructor() {
    super();
    this.flags = {closed: false};
  }

  text() {
    let {closed} = this.flags;
    return closed ? i18n("closed") : i18n("open");
  }

  options(callback) {
    callback([i18n("open"), i18n("closed")]);
  }

  translate(item) {
    return item;
  }

  select(item, callback) {
    let {flags} = this;
    flags.closed = item === i18n("closed");
    this.publish();
    callback();
  }

  get state() {
    let {flags} = this;
    return {closed: flags.closed};
  }

}

export default Filters;
