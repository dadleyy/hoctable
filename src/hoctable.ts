import Table from "./hoctable/hoc/table";
import { ColumnProps, TableProps } from "./hoctable/hoc/table";

import ActionMenu from "./hoctable/hoc/action_menu";

import Select from "./hoctable/hoc/select";
import { SingleSelectDelegate, ItemProps, SingleSelectProps } from "./hoctable/hoc/select";

import MultiSelect from "./hoctable/hoc/multi_select";
import { MultiSelectProps, MultiSelectDelegate } from "./hoctable/hoc/multi_select";

import Wall from "./hoctable/hoc/wall";
import { WallProps, WallItemProps, WallDelegate } from "./hoctable/hoc/wall";

import Popups from "./hoctable/services/popups";
import { PopupPlacement } from "./hoctable/services/popups";

import Viewport from "./hoctable/services/window";
import { Position, Dimensions } from "./hoctable/services/window";

import utils from "./hoctable/utils";

const hoc      = { MultiSelect, Wall, ActionMenu, Table, Select };
const services = { Popups, Viewport };

export { hoc, services };
