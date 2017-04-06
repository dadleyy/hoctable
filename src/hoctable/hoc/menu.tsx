import util from "hoctable/utils";
import Popups from "hoctable/services/popups";
import {PopupPlacement} from "hoctable/services/popups";
import Viewport from "hoctable/services/window";
import * as React from "react";

const TARGET_TOP_BUFFER = 3;

export type PopupCloseCallback = () => void;

export interface MenuOpenEvent {
  currentTarget : HTMLElement;
}

export interface MenuState {
  popup : string | number;
}

export const CLASSES = {
  MENU                  : "hoctable__menu",
  MENU_DEFAULT_BUTTON   : "hoctable__menu-default-button",
  MENU_BUTTON_CONTAINER : "hoctable__menu-button-container",
};

function bottom(box : ClientRect) : number {
  return box.top + box.height;
}

export function DefaultButton(props : any) : React.ReactElement<any> {
  let { text } = props;

  return (<a className={CLASSES.MENU_DEFAULT_BUTTON}>{text}</a>);
}

function Factory<P>(Popup : React.ComponentClass<any>, Button = DefaultButton) : React.ComponentClass<P> {

  class Menu extends React.Component<P, MenuState> {
    private popup : string;

    constructor(props) {
      super(props);
      this.open  = this.open.bind(this);
      this.state = { popup: null };
    }

    componentWillUnmount() : void {
      let { state } = this;
      Popups.close(state.popup);
    }

    open(trigger : React.MouseEvent<any>) : void {
      let button = this.refs["button"] as HTMLElement;
      let bounding  = button.getBoundingClientRect();

      /* Get the current top of the window, this will need to be added to the position that
       * we use to place the popup, which will go below the button that was clicked.
       */
      let { y: win_top } = Viewport.scroll();
      let { width: window_width } = Viewport.dimensions();

      // Calculate the top.
      let top = bottom(bounding) + TARGET_TOP_BUFFER + win_top;

      // Create our placement object using the provided bounding box.
      let placement : PopupPlacement = { top, left: bounding.left };

      // If we're on the right side of the screen, move the menu to be right aligned
      if(bounding.left > window_width * 0.5) {
        placement.right = window_width - (bounding.left + bounding.width);
      }

      function close() : void {
        Popups.close(popup);
        this.setState({ popup: null });
      }

      // Open the popup component with all of the props that were given to us
      let popup = Popups.open(<Popup {...this.props} close={close.bind(this)} />, placement);

      if(popup === -1) {
        throw new Error("unable to open popup, is service mounted?");
      }

      // Update our state with the popup id so we may close it on unmount
      this.setState({ popup });
    }

    render() : JSX.Element {
      return (
        <div className={CLASSES.MENU}>
          <div className={CLASSES.MENU_BUTTON_CONTAINER} onClick={this.open} ref="button">
            <Button {...this.props} />
          </div>
        </div>
      );
    }

  }

  return Menu;

}

export default Factory;
