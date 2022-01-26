import React, { useContext, useState } from "react";
import Head from "next/head";
import {
  AppBar,
  Container,
  CssBaseline,
  Link,
  Switch,
  Toolbar,
  Typography,
  Badge,
  createTheme,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import useStyles from "../../utils/styles";
import NextLink from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { Storage } from "../../utils/Storage";
import { useRouter } from "next/router";

const Layout = (props) => {
  const route = useRouter();
  const classes = useStyles();
  const { state, dispatch } = useContext(Storage);
  const [anchorEl, setAnchorEl] = useState(null);

  const { darkMode, cart, userInfo } = state;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    route.push("/");
  };

  const darkModeChangeHandler = () => {
    // console.log(`before dispatch ${darkMode}`);
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    // console.log(`after dispatch ${darkMode}`);
    // Cookies.set("DarkMode", darkMode ? "ON" : "OFF");
  };

  const handleUserClick = () => {};

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
                <Link>
                  {cart.cartItems.length > 0 && (
                    <Badge
                      badgeContent={cart.cartItems.reduce(
                        (previous, current) => {
                          return previous + current.quantity;
                        },
                        0
                      )}
                      color="secondary"
                    >
                      <Button className={classes.navUser}>Cart</Button>
                    </Badge>
                  )}
                </Link>
              </NextLink>
            </div>
            <div>
              {userInfo ? (
                <div>
                  <Button
                    className={classes.navUser}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <NextLink href={`/login?redirect=${route.asPath}`} passHref>
                  <Link>login</Link>
                </NextLink>
              )}
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
