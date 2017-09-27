import Popups, { PopupPlacement } from "hoctable/services/popups";
import Viewport from "hoctable/services/window";
import * as React from "react";

const TARGET_TOP_BUFFER = 3;

export type PopupCloseCallback = () => void;

export interface MenuOpenEvent {
  currentTarget : HTMLElement;
}

export interface MenuState {
  popup    : string | number;
  updated? : number;
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
  const { text } = props;

  return (<a className={CLASSES.MENU_DEFAULT_BUTTON}>{text}</a>);
}

function Factory<P>(Popup : React.ComponentClass<any>, Button = DefaultButton) : React.ComponentClass<P> {

  class Menu extends React.Component<P, MenuState> {

    constructor(props) {
      super(props);
      this.open  = this.open.bind(this);
      this.state = { popup: null };
    }

    componentWillUnmount() : void {
      const { state } = this;

      Popups.close(state.popup);
    }

    open(trigger : React.MouseEvent<any>) : void {
      const button = this.refs["button"] as HTMLElement;
      const bounding  = button.getBoundingClientRect();

      /* Get the current top of the window, this will need to be added to the position that
       * we use to place the popup, which will go below the button that was clicked.
       */
      const { y: win_top } = Viewport.scroll();
      const { width: window_width } = Viewport.dimensions();

      // Calculate the top.
      const top = bottom(bounding) + TARGET_TOP_BUFFER + win_top;

      // Create our placement object using the provided bounding box.
      const placement : PopupPlacement = { top, left: bounding.left };

      // If we're on the right side of the screen, move the menu to be right aligned
      if(bounding.left > window_width * 0.5) {
        placement.right = window_width - (bounding.left + bounding.width);
      }

      let popup = null;

      const close = () : void => {
        Popups.close(popup);
        this.setState({ popup: null });
      };

      const redraw = () : void => {
        this.setState({ updated: Date.now() });
      };

      // Open the popup component with all of the props that were given to us
      popup = Popups.open(<Popup {...this.props as object} close={close} redraw={redraw} />, placement);

      // Update our state with the popup id so we may close it on unmount
      this.setState({ popup });
    }

    render() : JSX.Element {

      return (
        <div className={CLASSES.MENU}>
          <div className={CLASSES.MENU_BUTTON_CONTAINER} onClick={this.open} ref="button">
            <Button {...this.props as object} />
          </div>
        </div>
      );
    }

  }

  return Menu;

}

export default Factory;
