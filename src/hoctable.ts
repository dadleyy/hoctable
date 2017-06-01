import Table from "./hoctable/hoc/table";
import { ColumnProps, TableProps } from "./hoctable/hoc/table";

import Menu from "./hoctable/hoc/menu";

import Select from "./hoctable/hoc/select";
import { SingleSelectDelegate, ItemProps, SingleSelectProps } from "./hoctable/hoc/select";

import Search from "./hoctable/hoc/search";
import { SearchDelegate, SearchProps, SearchItemProps } from "./hoctable/hoc/search";

import MultiSelect from "./hoctable/hoc/multi_select";
import { MultiSelectSearchProps, MultiSelectProps, MultiSelectDelegate } from "./hoctable/hoc/multi_select";

import Wall from "./hoctable/hoc/wall";
import { WallProps, WallItemProps, WallDelegate } from "./hoctable/hoc/wall";

import Popups from "./hoctable/services/popups";
import { PopupPlacement } from "./hoctable/services/popups";

import Viewport from "./hoctable/services/window";
import { Position, Dimensions } from "./hoctable/services/window";

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

import Grid from "./hoctable/hoc/grid";

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

export { hoc, services, utils };
