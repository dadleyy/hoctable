import Table from "hoctable/hoc/table";
import ActionMenu from "hoctable/hoc/action_menu";
import Select from "hoctable/hoc/select";
import MultiSelect from "hoctable/hoc/multi_select";

import Popups from "hoctable/services/popups";
import Viewport from "hoctable/services/window";
import utils from "hoctable/utils";

import Pagination from "hoctable/stores/pagination";
import Sorting from "hoctable/stores/sorting";

const hoc      = {MultiSelect, ActionMenu, Table, Select};
const services = {Popups, Viewport};
const stores   = {Pagination, Sorting};

export {hoc, services, utils, stores};
