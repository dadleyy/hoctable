import * as React from "react";
import {hoc} from "hoctable";

class Preview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wall-item">
      </div>
    );
  }

}

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let image_style = {"display": "block"};

    return (
      <div className="wall-card">
        <div className="clearfix">
          <div className="display-block"><img style={image_style} src="http://lorempixel.com/g/560/420" /></div>
          <div className="float-left"></div>
        </div>
      </div>
    );
  }

}

class Delegate {

  constructor() {
    this.store = [];
  }

  items(callback) {
    let {store} = this;
    callback(store);
  }

}

let ImageWall = hoc.Wall(Preview, Card);

class Wall extends React.Component {

  constructor(props) {
    super(props);
    this.delegate = new Delegate();
  }

  render() {
    let {delegate} = this;
    let update     = this.forceUpdate.bind(this);

    function remove() {
      delegate.store.shift();
      update();
    }

    function loaded(xhr, {meta, results}) {
      for(let i = 0, c = results.length; i < c; i++) {
        let user = results[i];
        delegate.store.push({user});
      }

      update();
    }

    function lots() {
      let max  = 20;
      let rand = Math.random() * 100;
      let page = Math.floor(rand % 2);

      qwest.get(`/api/people`, {max, page})
        .then(loaded);
    }

    function add() {
      let max  = 1;
      let rand = Math.random() * 100;
      let page = Math.ceil(rand % 22);

      qwest.get(`/api/people`, {max, page})
        .then(loaded);
    }

    return (
      <div className="wall-page">
        <div className="clearfix margin-bottom-1">
          <a className="button" onClick={add}>add</a>
          <a className="button" onClick={remove}>remove</a>
          <a className="button" onClick={lots}>add 20</a>
        </div>
        <ImageWall delegate={this.delegate} />
      </div>
    );
  }

}

export default Wall;
