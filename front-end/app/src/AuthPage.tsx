import { Button, Paper, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import {AddModal, EditModal, DeleteModal} from "./modals"

async function storeCredentials(email: string, password: string) {
  // Encrypt the credentials.
  // Precautionary, you still shouldn't use real credentials to log in here.
  const raw = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${email}${password}`)
  );

  // Decode the encrypted buffer
  const auth_token = new TextDecoder().decode(raw);

  // Set the auth_token key in localStorage
  localStorage.setItem("auth_token", auth_token);
}



function AuthHeader() {
  return (
    <Grid item>
      <Typography variant="h3">Please Log In</Typography>
    </Grid>
  );
}

async function submitCredentials() {
  console.log("submitting");
  await storeCredentials("fake", "credentials");
  window.location.reload();
}

function AuthForm() {
  return (
    <form>
      <Grid item>
        <TextField
          required
          label="Email"
          type="email"
          autoComplete="username"
        />
      </Grid>
      <Grid item>
        <TextField
          required
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={submitCredentials}>Authenticate</Button>
      </Grid>
    </form>
  );
}

function AuthGrid() {
  return (
    <Paper style={{ padding: "3em" }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <AuthHeader />
        <AuthForm />
      </Grid>
    </Paper>
  );
}

export function AuthPage() {
  return (
    <div
      style={{
        height: "100%",
        margin: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <AuthGrid />
      </div>
    </div>
  );
}
