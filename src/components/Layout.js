import React from "react";
import Head from "next/head";
import {
  AppBar,
  Container,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import useStyles from "../../utils/styles";
import NextLink from "next/link";
import { ThemeProvider } from "@mui/styles";
import theme from "../theme";

const Layout = (props) => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>
          {props.title ? `${props.title} - NextStore` : "NextStore"}
        </title>
        {props.description && (
          <meta name="description" content={props.description}></meta>
        )}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Next-Sotre</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <NextLink href="/cart" passHref>
                <Link>cart</Link>
              </NextLink>
            </div>
            <div>
              <NextLink href="/login" passHref>
                <Link>login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{props.children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. NextStore</Typography>
        </footer>
      </ThemeProvider>
    </>
  );
};

export default Layout;
