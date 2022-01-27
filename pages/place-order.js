import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import {
  List,
  ListItem,
  Button,
  Link,
  Table,
  TableContainer,
  TableHead,
  Grid,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Card,
} from "@mui/material";
import Layout from "../src/components/Layout";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { Storage } from "../utils/Storage";
import { useRouter } from "next/router";
import CheckoutWizard from "../src/components/checkoutWizard";
import dynamic from "next/dynamic";
import Image from "next/image";

const PlaceOrder = (props) => {
  const classes = useStyles();
  const [orderSucceed, setOrderSucceed] = useState(false);
  const { state, dispatch } = useContext(Storage);
  const { cart, userInfo } = state;
  const { cartItems, adressInfo, paymentMethod } = state.cart;
  const router = useRouter();
  const { redirect } = router.query;

  if (!Cookies.get("userInfo")) {
    typeof window !== "undefined" &&
      router.push("/login?redirect=/place-order");
  }
  // check if the adress session has been finished
  if (!state.cart.adressInfo) {
    router.push("/login?redirect=/shipping");
  }
  // if (!state.cart.paymentMethod) {
  //   typeof window !== "undefined" && router.push("/login?redirect=/payment");
  // }
  if (cartItems) {
    const itemsPrice = cartItems.reduce(
      (pre, cur) => pre + cur.price * cur.quantity,
      0
    );
  }
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = Math.round(itemsPrice * 0.1 * 100) / 100;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const palceOrderHandler = async (e) => {
    e.preventDefault();
    // check all the info is prepared
    //send the order data to DB and save it
    const dataBody = {
      items: cartItems.map((item) => item._id),
      paymentMethod: paymentMethod,
      adressInfo: adressInfo,
      price: { itemsPrice, shippingPrice, taxPrice, totalPrice },
    };
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInfo.token,
        },
        body: JSON.stringify(dataBody),
      });
      if (res.ok) {
        const comfirmedOrder = await res.json();
        console.log(comfirmedOrder);

        console.log("!!!!!!!!!!!!!!!!!!!!!finish");
        router.push("/profile");
        dispatch({ type: "FINISH_ORDER" });
      } else {
        const errMessage = await res.json();
        console.log(`serser error`);
        console.log(errMessage);
        if (errMessage === "token is invalid") {
          alert("Your authetication is expired, please login again");
          router.push("/login?redirect=/place-order");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!cart) {
    return <div>no items in the cart</div>;
  }
  return (
    <Layout>
      <div className={classes.wizard}>
        <CheckoutWizard activeStep={4}></CheckoutWizard>
      </div>
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Adress
                </Typography>
              </ListItem>
              <ListItem>
                {cart.adressInfo?.fullName}, {cart.adressInfo?.streetAdress},{" "}
                {cart.adressInfo?.suburb}, {cart.adressInfo?.stateName},{" "}
                {cart.adressInfo?.postCode}
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{cart.paymentMethod}</ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.cartItems?.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">${item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography>Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      ${itemsPrice?.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      ${taxPrice?.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      ${shippingPrice?.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>${totalPrice?.toFixed(2)}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={palceOrderHandler}
                  fullWidth
                  variant="contained"
                >
                  Placer Order
                </Button>
              </ListItem>
              <ListItem className={classes.flexend}>
                <NextLink href="/payment" passHref>
                  <Link>Back</Link>
                </NextLink>
              </ListItem>
              <ListItem className={classes.flexend}>
                <NextLink href="/" passHref>
                  <Link>Continue to Shopping</Link>
                </NextLink>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
