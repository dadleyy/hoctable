import Table from "../components/table";

export default function People({delegate, store}) {
  return (
    <div className="clearfix">
      <div className="border-bottom">
        <a href="/unmounted">Unmount</a>
      </div>
      <Table delegate={delegate} store={store} />
    </div>
  );
}
