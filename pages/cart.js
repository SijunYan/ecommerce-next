import React, { useContext } from "react";
import Layout from "../src/components/Layout";
import { Storage } from "../utils/Storage";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import {
  MenuItem,
  Table,
  TableContainer,
  TableHead,
  Button,
  Grid,
  Select,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Card,
  List,
  ListItem,
  Link,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const cart = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Storage);
  const { cart } = state;

  const slectedhandler = (item, event) => {
    const updatedItem = { ...item, quantity: event.target.value };
    console.log(updatedItem);
    dispatch({
      type: "CART_UPDATE_ITEM",
      payload: updatedItem,
    });
  };

  const deleteHander = (item) => {
    dispatch({
      type: "CART_DELETE_ITEM",
      payload: item,
    });
  };

  const checkoutHandler = () => {
    if (Cookies.get("userInfo")) {
      router.push("./shipping");
    } else {
      router.push("./login?redirect=/shipping");
    }
  };

  return (
    <Layout>
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {cart.cartItems.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <NextLink href="/" passHref>
            <Link>Go shopping</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.cartItems.map((item) => (
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
                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(event) => {
                            slectedhandler(item, event);
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((i) => (
                            <MenuItem key={i} value={i + 1}>
                              {i + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button onClick={(e) => deleteHander(item)}>x</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography>
                    Subtotal(
                    {cart.cartItems.reduce((previous, current) => {
                      return previous + current.quantity;
                    }, 0)}
                    {"  "}items) : ${" "}
                    {cart.cartItems.reduce((previous, current) => {
                      return previous + current.quantity * current.price;
                    }, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button onClick={checkoutHandler}>Check Out</Button>
                </ListItem>
                <ListItem>
                  <Button>
                    <NextLink href="/" passHref>
                      <Link>Continue to Shopping</Link>
                    </NextLink>
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(cart), { ssr: false });
