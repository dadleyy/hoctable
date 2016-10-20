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

    if(true == row.empty)
      return (<tr className="person-row--empty"><td colSpan="3">No results</td></tr>);

    return (
      <tr className="person-row">
        <td className="person-row__id">
          <p>{person.id}</p>
        </td>
        <td className="person-row__name">
          <p>{person.name}</p>
        </td>
        <td className="person-row__age">
          <p>{person.age}</p>
        </td>
      </tr>
    )
  }

}

export default Row;

