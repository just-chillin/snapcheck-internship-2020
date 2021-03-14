/**
 * Contains the modals used to either create, update, or delete db items.
 * Called when the user presses a toolbar button.
 */

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

import React, { useState } from "react";
import { Order, orderDELETE } from "./api";
import { useHistory, useLocation } from "react-router";

export function AddModal() {}

export function EditModal() {}

export function DeleteModal() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const history = useHistory();
  function onClose() {
    setIsOpen(false);
    if (location.key) {
      orderDELETE(Number.parseInt(location.key));
    }
    setIsOpen(false);
    history.push("/");
  }
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>Are You Sure?</DialogTitle>
      <ListItem button>
        <ListItemText primary="Yes, delete." />
      </ListItem>
      <ListItem button>
        <ListItemText primary="No, go back!" />
      </ListItem>
    </Dialog>
  );
}

function AddOrEditModal() {}
