import { hoc } from "hoctable";
import i18n from "services/i18n";

function errorRow() {
  return (
    <tr>
      <td colSpan="3">
        <p>{i18n("something_went_wrong")}</p>
      </td>
    </tr>
  );
}

function emptyRow() {
  return (
    <tr>
      <td colSpan="3">
        <p>{i18n("no_results")}</p>
      </td>
    </tr>
  );
}

class RestaurantRow extends React.Component {

  render() {
    const { restaurant } = this.props;
    const { location: loc, user_rating: rating } = restaurant;

    return (
      <tr>
        <td className="restaurant-name">
          <p>{restaurant.name}</p>
        </td>
        <td className="restaurant-location">
          <div className="street">
            <p>{loc ? loc.address : null}</p>
          </div>
        </td>
        <td className="restaurant-rating">
          <p>{rating ? `${rating.aggregate_rating} (${rating.votes})` : null}</p>
        </td>
      </tr>
    );
  }

}

class Row extends React.Component {

  constructor() {
    super(...arguments);
  }

  render() {
    let { row } = this.props;

    if(row.empty === true) {
      return emptyRow();
    }

    if(row.error) {
      return errorRow();
    }

    return <RestaurantRow {...row} />;
  }

}

export default hoc.Table(Row);
