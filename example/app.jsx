import {Factory} from "hoctable";
import Delegate from "./delegate"

function age(dob) {
  let today = new Date().getFullYear();
  return today - new Date(dob).getFullYear();
}

class Row extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {row, delegate} = this.props;
    let {person} = row;

    return (
      <tr className="usertable__row">
        <td className="usertable__name-cell">
          <span>{person.name.first} {person.name.last}</span>
        </td>
        <td className="usertable__age-cell">
          <span>{age(person.dob)}</span>
        </td>
      </tr>
    );
  }

}

let Table = Factory(Row);
let sorting = {};
let delegate = new Delegate(sorting);

ReactDOM.render(<Table delegate={delegate} sorting={sorting} />, document.getElementById("main"));
