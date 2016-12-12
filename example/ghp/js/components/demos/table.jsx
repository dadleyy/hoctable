import * as hoctable from "hoctable";
import i18n from "../../services/i18n";

const RELEASE_FORMAT = "MMM Do YYYY";

function emptyRow() {
  return (
    <tr className="movie-row movie-row--empty">
      <td colSpan="7">{i18n("no_results")}</td>
    </tr>
  );
}

class Row extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {row}    = this.props;
    let {movie, empty}  = row;

    if(empty === true)
      return emptyRow();

    let released = moment(movie.release_date).format(RELEASE_FORMAT);

    return (
      <tr className="movie-row">
        <td className="move-row__id">
          <p>{movie["const"]}</p>
        </td>
        <td className="move-row__title">
          <p>{movie.title}</p>
        </td>
        <td className="move-row__release">
          <p>{released}</p>
        </td>
        <td className="move-row__runtime">
          <p>{movie.runtime}</p>
        </td>
        <td className="move-row__directors">
          <p>{movie.directors}</p>
        </td>
        <td className="move-row__genres">
          <p>{movie.genres}</p>
        </td>
        <td className="move-row__rating">
          <p>{movie.imdb_rating}</p>
        </td>
      </tr>
    );
  }

}

export default hoctable.hoc.Table(Row);
