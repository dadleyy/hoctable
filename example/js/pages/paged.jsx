import PagedTable from "../components/paged_table";

export default function Paged({delegate, store}) {
  function search(event) {
    let {target: {value}} = event;
    store.dispatch({type: "NAME_SEARCH", value});
  }

  return (
    <div className="clearfix">
      <div className="border-bottom">
        <h6>Paged Example <a href="/unmounted">Unmount</a></h6>
      </div>
      <div className="clearfix">
        <input type="text" onInput={search} placeholder="Search Names" />
      </div>
      <PagedTable delegate={delegate} store={store} />
    </div>
  );
}
