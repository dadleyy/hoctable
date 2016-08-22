import {Factory} from "hoctable";
import Delegate from "./delegate"

class Row extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
      </tr>
    );
  }

}

let Table = Factory(Row);
let delegate = new Delegate();

ReactDOM.render(<Table delegate={delegate} />, document.getElementById("main"));
