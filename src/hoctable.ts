import Table from "./hoctable/hoc/table";
import {TableProps} from "./hoctable/hoc/table";

import ActionMenu from "./hoctable/hoc/action_menu";

import Select from "./hoctable/hoc/select";
import {SingleSelectDelegate, ItemProps, SingleSelectProps} from "./hoctable/hoc/select";

import MultiSelect from "./hoctable/hoc/multi_select";
import {MultiSelectProps, MultiSelectDelegate} from "./hoctable/hoc/multi_select";

import Popups from "./hoctable/services/popups";
import {PopupPlacement} from "./hoctable/services/popups";

import Viewport from "./hoctable/services/window";
import {ListenerCallback, Position, Dimensions} from "./hoctable/services/window";

import utils from "./hoctable/utils";

import Pagination from "./hoctable/stores/pagination";
import Sorting from "./hoctable/stores/sorting";

const hoc      = {MultiSelect, ActionMenu, Table, Select};
const services = {Popups, Viewport};
const stores   = {Pagination, Sorting};

export default {hoc, services, stores};
