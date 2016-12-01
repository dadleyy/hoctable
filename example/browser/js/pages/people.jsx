import Table from "../components/person_table";

export default function Paged({delegate, store}) {
  function search(event) {
    let {target: {value}} = event;
    delegate.query = value;
    store.dispatch({type: "PAGINATION_GOTO", page: 0});
  }

  return (
    <div className="clearfix">
      <div className="border-bottom">
        <h6>Paged Example <a href="/unmounted">Unmount</a></h6>
      </div>
      <div className="clearfix">
        <input type="text" onInput={search} placeholder="Search Names" />
      </div>
      <Table delegate={delegate} store={store} />
    </div>
  );
}
