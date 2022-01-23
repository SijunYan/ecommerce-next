import React, { useContext } from "react";
import { useRouter } from "next/router";
import data from "../../utils/data";
import Layout from "../../src/components/Layout";
import NextLink from "next/link";
import {
  Grid,
  Link,
  List,
  Typography,
  ListItem,
  Card,
  Button,
} from "@mui/material";
import Image from "next/image";
import useStyles from "../../utils/styles";
import { convertDocToObj, dbConnect, dbDisconnect } from "../../utils/db";
import Product from "../../models/Prodoct";
import { Storage } from "../../utils/Storage";

const ProductPage = (props) => {
  const { state, dispatch } = useContext(Storage);

  const { product } = props;

  const classes = useStyles();
  if (!product) {
    return <div>No product found</div>;
  }

  const addToCartHandler = () => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: product,
    });
    console.log(product);
  };

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/">
          <Link>
            <Typography>Back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            width={640}
            height={640}
            layout="responsive"
            alt={product.name}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Catigory:{product.catigory}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand:{product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating:{product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description:{product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>$ {product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? "In stock" : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductPage;

export async function getServerSideProps(context) {
  await dbConnect();
  const { slug } = context.params;

  const product = await Product.findOne({ slug: slug }).lean();
  await dbDisconnect();

  return {
    props: {
      product: convertDocToObj(product),
    },
  };
}
