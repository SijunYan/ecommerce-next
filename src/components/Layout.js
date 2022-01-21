import React, { useContext } from "react";
import Head from "next/head";
import {
  AppBar,
  Container,
  CssBaseline,
  Link,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import useStyles from "../../utils/styles";
import NextLink from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { Context } from "../../utils/Storage";
import { createTheme } from "@mui/material/styles";

const Layout = (props) => {
  const classes = useStyles();

  const { state, dispatch } = useContext(Context);
  const { darkMode } = state;
  console.log(darkMode);
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
      error: {
        main: red.A400,
      },
    },
    typography: {
      h1: { fontSize: "1.6rem", fontWeight: "bold", margin: "1rem 0" },
      h1: { fontSize: "1.4rem", fontWeight: "bold", margin: "1rem 0" },
    },
  });

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
            <Switch checked={darkMode} onChange={darkModeChangeHandler} />
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
