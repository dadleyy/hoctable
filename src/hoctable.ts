import Table, { ColumnProps, TableProps } from "./hoctable/hoc/table";
import Select, { SingleSelectDelegate, ItemProps, SingleSelectProps } from "./hoctable/hoc/select";
import Search, { SearchDelegate, SearchProps, SearchItemProps } from "./hoctable/hoc/search";
import Menu from "./hoctable/hoc/menu";
import Wall, { WallProps, WallItemProps, WallDelegate } from "./hoctable/hoc/wall";
import Grid from "./hoctable/hoc/grid";
import MultiSelect, {
  MultiSelectSearchProps,
  MultiSelectProps,
  MultiSelectDelegate
} from "./hoctable/hoc/multi_select";

import Popups, { PopupPlacement } from "./hoctable/services/popups";
import Viewport, { Position, Dimensions } from "./hoctable/services/window";

import utils from "./hoctable/utils";

const hoc = {
  Grid,
  Menu,
  MultiSelect,
  Select,
  Search,
  Table,
  Wall
};

const services = { Popups, Viewport };

export {
  Position,
  Dimensions,
  PopupPlacement,
  WallProps,
  WallItemProps,
  WallDelegate,
  MultiSelectProps,
  MultiSelectSearchProps,
  MultiSelectDelegate,
  SearchDelegate,
  SearchProps,
  SearchItemProps,
  SingleSelectProps,
  ItemProps,
  SingleSelectDelegate,
  ColumnProps,
  TableProps
};

export { hoc, services, utils };
