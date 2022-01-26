import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import {
  Box,
  List,
  ListItem,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import Layout from "../src/components/Layout";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { Storage } from "../utils/Storage";
import { useRouter } from "next/router";
import CheckoutWizard from "../src/components/checkoutWizard";

const shipping = (props) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Storage);
  const { cartItems, adressInfo } = state.cart;
  const [fullName, setFullName] = useState(adressInfo.fullName || null);
  const [streetAdress, setStreetAdress] = useState(
    adressInfo.streetAdress || null
  );
  const [suburb, setSuburb] = useState(adressInfo.suburb || null);
  const [postCode, setPostCode] = useState(adressInfo.postCode || null);
  const [stateName, setStateName] = useState(adressInfo.stateName || null);
  const router = useRouter();
  const { redirect } = router.query;
  if (!Cookies.get("userInfo")) {
    typeof window !== "undefined" && router.push("/login?redirect=/shipping");
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { fullName, streetAdress, suburb, postCode, stateName };
    dispatch({ type: "SAVE_ADRESS", payload: data });
    router.push("/payment");
  };

  return (
    <Layout>
      <div className={classes.wizard}>
        <CheckoutWizard activeStep={1}></CheckoutWizard>
      </div>
      <form className={classes.form} onSubmit={submitHandler}>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="fullName"
              label="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              defaultValue={fullName}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="streetAdress"
              label="Street Adress"
              onChange={(e) => setStreetAdress(e.target.value)}
              defaultValue={streetAdress}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="suburb"
              label="Suburb"
              onChange={(e) => setSuburb(e.target.value)}
              defaultValue={suburb}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="stateName"
              label="State"
              onChange={(e) => setStateName(e.target.value)}
              defaultValue={stateName}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="postCode"
              label="Post Code"
              onChange={(e) => setPostCode(e.target.value)}
              defaultValue={postCode}
            />
          </ListItem>
          <ListItem>
            <Button type="submit" fullWidth variant="contained">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default shipping;
