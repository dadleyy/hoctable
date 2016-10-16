import PagedTable from "../components/paged_table";

export default function Paged({delegate, store}) {
  return (
    <div className="clearfix">
      <div className="border-bottom">
        <h6>Paged Example <a href="/unmounted">Unmount</a></h6>
      </div>
      <PagedTable delegate={delegate} store={store} />
    </div>
  );
}
