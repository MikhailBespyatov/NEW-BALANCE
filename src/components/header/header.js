import React from "react";
//import "./header.scss";
import { Link } from "react-router-dom";
import headerLogo from "./img/nb-logo.png";
import { AppBar, Container, makeStyles, Grid } from "@material-ui/core";
import NavPanel from "../nav-panel";
import UserPanel from "../user-panel";
import SearchPanel from "../search-panel";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "#000",
    padding: theme.spacing(1)
  }
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static">
      <Container fixed>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Link to="/">
              <img
                className="header-logo"
                src={headerLogo}
                width="100"
                height="60"
                alt="img"
              />
            </Link>
          </Grid>

          <Grid item xs>
            <NavPanel />
          </Grid>

          <Grid item xs>
            <SearchPanel />
          </Grid>

          <UserPanel />
        </Grid>
      </Container>
    </AppBar>
  );
};
