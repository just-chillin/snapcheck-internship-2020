import React, { useEffect, useState } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@material-ui/data-grid";
import { CircularProgress } from "@material-ui/core";

function addressFromGridCellParams(params: GridCellParams): string {
  let { address1, address2, city, state, zip } = params.row.address;
  console.debug(params.row);
  // If addr2 is falsy, set it to an empty string. Otherwise, left pad it one space.
  address2 = address2 ? " " + address2 : "";

  return `${address1}${address2}, ${city}, ${state} ${zip}`;
}

const columns: GridColDef[] = [
  { field: "first_name", headerName: "First Name", width: 150 },
  { field: "last_name", headerName: "Last Name", width: 150 },
  {
    field: "address",
    headerName: "Address",
    valueGetter: addressFromGridCellParams,
    width: 300
  },
  { field: "gender", headerName: "Gender" },
  { field: "age", headerName: "Age" },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    valueGetter: (params) => params.row.order_total.amount
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 150,
    valueGetter: (params) => params.row.order_total.currency
  },
];

interface Order {
  id: number;
  first_name: string;
  last_name: string;
  address: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
  };
  gender: string;
  age: number;
  order_total: {
    currency: string;
    amount: number;
  };
}

async function getOrders(): Promise<Order[]> {
  const result = await fetch("http://localhost:3001/people");
  const orders = (await result.json()) as Order[];
  console.log(orders);
  return orders;
}

export function DBView() {
  const [orders, setOrders] = useState<Order[]>();
  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  if (!orders) {
    return <CircularProgress />;
  }
  return <DataGrid columns={columns} rows={orders} autoPageSize />;
}
