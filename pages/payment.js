import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Box,
  List,
  ListItem,
  TextField,
  Typography,
  Button,
  Link,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Layout from "../src/components/Layout";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { Storage } from "../utils/Storage";
import { useRouter } from "next/router";
import CheckoutWizard from "../src/components/checkoutWizard";

const payment = (props) => {
  const classes = useStyles();

  const { state, dispatch } = useContext(Storage);
  const [paymentMethod, setPaymentMethod] = useState(
    state.cart.paymentMethod || null
  );
  const router = useRouter();
  const { redirect } = router.query;
  if (!Cookies.get("userInfo")) {
    typeof window !== "undefined" && router.push("/login?redirect=/shipping");
  }
  // check if the adress session has been finished
  //

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Payment method is required");
      return;
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
    router.push("/place-order");
  };

  return (
    <Layout>
      <div className={classes.wizard}>
        <CheckoutWizard activeStep={2}></CheckoutWizard>
      </div>
      <form className={classes.form} onSubmit={submitHandler}>
        <List>
          <ListItem>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={paymentMethod}
                defaultValue={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="PayPal"
                  control={<Radio />}
                  label="PayPal"
                />
                <FormControlLabel
                  value="Stripe"
                  control={<Radio />}
                  label="Stripe"
                />
                <FormControlLabel
                  value="Cash"
                  control={<Radio />}
                  label="Cash"
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button type="submit" fullWidth variant="contained">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={() => {
                router.push("/shipping");
              }}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default payment;
