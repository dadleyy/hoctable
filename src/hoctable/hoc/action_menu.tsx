import util from "hoctable/utils";
import Popups from "hoctable/services/popups";
import {PopupPlacement} from "hoctable/services/popups";
import Viewport from "hoctable/services/window";
import * as React from "react";

const TARGET_TOP_BUFFER = 3;

export interface MenuOpenEvent {
  currentTarget: HTMLElement
}

export interface MenuState {
  popup: string | number;
}

export interface PopupCloseCallback {
  () : void;
}

function bottom(box : ClientRect) : number {
  return box.top + box.height;
}

export function DefaultButton(props : any) : React.ReactElement<any> {
  let {text} = props;
  return (<a className="hoctable__button">{text}</a>);
};

function ActionMenu<P>(Popup : React.ComponentClass<any>, Button = DefaultButton) : React.ComponentClass<P> {

  class Menu extends React.Component<P, MenuState> {
    private popup : string;

    constructor(props) {
      super(props);
      this.open  = this.open.bind(this);
      this.state = {popup: null};
    }

    componentWillUnmount() {
      let {state} = this;
      Popups.close(state.popup);
    }

    open(trigger : React.MouseEvent<any>) {
      let button = this.refs["button"] as HTMLElement;
      let bounding  = button.getBoundingClientRect();

      // get the current top of the window, this will need to be added to the position that
      // we use to place the popup, which will go below the button that was clicked.
      let {y: win_top} = Viewport.scroll();
      let {width: window_width} = Viewport.dimensions();

      // calculate the top
      let top = bottom(bounding) + TARGET_TOP_BUFFER + win_top;

      // create our placement object using the calculated 
      let placement : PopupPlacement = {top, left: bounding.left};

      // if we're on the right side of the screen, move the menu to be right aligned
      if(bounding.left > window_width * 0.5)
        placement.right = window_width - (bounding.left + bounding.width);

      function close() {
        Popups.close(popup);
        this.setState({popup: null});
      }

      // open the popup component with all of the props that were given to us
      let popup = Popups.open(<Popup {...this.props} close={close.bind(this)} />, placement);

      if(popup === -1)
        return;

      // update our state with the popup id so we may close it on unmount
      this.setState({popup});
    }

    render() {
      return (
        <div className="hoctable__action-menu">
          <div className="hoctable__action-menu-trigger" onClick={this.open} ref="button">
            <Button {...this.props} />
          </div>
        </div>
      )
    }

  }

  return Menu;

}

export default ActionMenu;
