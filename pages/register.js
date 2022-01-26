import {
  Box,
  List,
  ListItem,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Layout from "../src/components/Layout";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { Storage } from "../utils/Storage";
import { useRouter } from "next/router";

const register = () => {
  const classes = useStyles();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const { state, dispatch } = useContext(Storage);
  const router = useRouter();
  const { redirect } = router.query;

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    // validate
    if (password !== confirmedPassword) {
      alert("Password don't match!");
      return;
    }
    //POST Request to API
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        mode: "cors",
        body: JSON.stringify(data),
      });
      //   console.log(res);
      if (res.status === 200 || 401 || 500) {
        const fetchedData = await res.json();
        if (res.status === 200) {
          //   console.log("login succeed");
          //   console.log(fetchedData);
          dispatch({ type: "USER_LOGIN", payload: fetchedData });
          router.push(redirect || "/");
        } else {
          alert(fetchedData.message);
        }
      }
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <Layout>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography>register</Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="confirmedPassword"
              label="Confirmed password"
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <Button type="submit" fullWidth variant="contained">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? {"   "}
            <NextLink href="/login" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default register;
