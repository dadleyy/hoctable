import i18n from "services/i18n";

class Errored extends React.Component {

  render() {
    return (
      <div className="error-view container">
        <p>{i18n("something_went_wrong")}</p>
      </div>
    );
  }

}

export default Errored;
