import React, { useContext } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Layout from "../src/components/Layout";
import NextLink from "next/link";
import { dbConnect, dbDisconnect, convertDocToObj } from "../utils/db";
import Product from "../models/Prodoct";
import { Storage } from "../utils/Storage";

export default function Home(props) {
  const { state, dispatch } = useContext(Storage);
  const data = props;
  const addToCartHandler = (product) => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: product,
    });
  };

  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {data.products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                      alt=""
                    />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>

                <CardActions>
                  <Typography>$ {product.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      addToCartHandler(product);
                    }}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const products = await Product.find({}).lean();
  await dbDisconnect();

  return {
    props: {
      products: products.map(convertDocToObj),
    },
  };
}
