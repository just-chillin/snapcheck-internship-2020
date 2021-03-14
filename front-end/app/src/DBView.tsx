import { useEffect, useState } from "react";
import {
  DataGrid,
  GridAddIcon,
  GridCellParams,
  GridColDef,
  GridRowSelectedParams,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Delete } from "@material-ui/icons";
import { Order, ordersGET } from "./api";
import { useHistory } from "react-router";

interface WithSelectedRowProps {
  order?: Order;
}

const columns: GridColDef[] = [
  { field: "first_name", headerName: "First Name", width: 150, type: "string" },
  { field: "last_name", headerName: "Last Name", width: 150, type: "string" },
  {
    field: "address",
    headerName: "Address",
    valueGetter: addressFromGridCellParams,
    width: 300,
    type: "string",
  },
  { field: "gender", headerName: "Gender", type: "string" },
  { field: "age", headerName: "Age", type: "number" },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    valueGetter: (params) => params.row.order_total.amount,
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 150,
    valueGetter: (params) => params.row.order_total.currency,
  },
];

function addressFromGridCellParams(params: GridCellParams) {
  let { address1, address2, city, state, zip } = params.row.address;

  // If addr2 is falsy, set it to an empty string.
  // Otherwise, left pad it one space.
  address2 = address2 ? " " + address2 : "";

  return `${address1}${address2}, ${city}, ${state} ${zip}`;
}

function AddButton() {
  const history = useHistory();
  return (
    <Button>
      <GridAddIcon />
      Add
    </Button>
  );
}

function EditButton({order}: WithSelectedRowProps) {
  return (
    <Button disabled={order == undefined}>
      <EditIcon />
      Edit
    </Button>
  );
}

function DeleteButton({order}: WithSelectedRowProps) {
  const history = useHistory();

  function onClick() {
    history.push(`/delete/${order?.id}`);
  }

  return (
    <Button disabled={order == undefined} onClick={onClick}>
      <Delete />
      Delete
    </Button>
  );
}

function ToolbarButtons(props: WithSelectedRowProps) {
  return (
    <>
      <AddButton />
      <EditButton {...props} />
      <DeleteButton {...props} />
    </>
  );
}

function TableToolbar(props: WithSelectedRowProps) {
  return (
    <GridToolbarContainer>
      {ToolbarButtons(props)}
    </GridToolbarContainer>
  );
}

export function DBView() {
  const [data, setData] = useState<Order[]>();
  let [
    selectedRowRef,
    setCurrentlySelectedRowRef,
  ] = useState<GridRowSelectedParams>();
  useEffect(() => {
    ordersGET().then(setData);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          columns={columns}
          rows={data ?? []}
          loading={data === undefined}
          pagination
          disableMultipleSelection
          autoPageSize
          onRowSelected={setCurrentlySelectedRowRef}
          components={{ Toolbar: TableToolbar as any }}
          componentsProps={{
            toolbar: { order: selectedRowRef?.data } as WithSelectedRowProps,
          }}
        />
      </div>
    </div>
  );
}

