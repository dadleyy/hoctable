import Table from "../components/table";

export default function People({delegate, store}) {
  return (
    <div className="clearfix">
      <div className="border-bottom">
        <h6>Basic Example <a href="/unmounted">Unmount</a></h6>
      </div>
      <Table delegate={delegate} store={store} />
    </div>
  );
}
