import Table from "./hoc/table";
import PagedTable from "./hoc/paged_table";
import ActionMenu from "./hoc/action_menu";
import SingleSelect from "./hoc/single_select";

import reducers from "./reducers";
import Popups from "./services/popups";
import Viewport from "./services/window";

const hoc      = {ActionMenu, PagedTable, Table, SingleSelect};
const services = {Popups, Viewport};

export {hoc, services, reducers};
