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

const login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { state, dispatch } = useContext(Storage);
  const router = useRouter();
  const { redirect } = router.query;

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { email, password };
    // validate
    // console.log(`validate ${JSON.stringify(data)}`);
    //POST Request to API
    try {
      const res = await fetch("/api/users/login", {
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
        <Typography>Login</Typography>
        <List>
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
            <Button type="submit" fullWidth variant="contained">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account? {"   "}
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default login;
