import React from "react";
import { useSelector } from "react-redux";
import { IconButton, makeStyles, Box } from "@material-ui/core";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShopIcon from "@material-ui/icons/Shop";
import { withRouter } from "react-router";

const useStyles = makeStyles({
  user: {
    color: " white",
    fontSize: "40px"
  },
  cart: {
    position: "relative"
  },
  cartIndicator: {
    position: "absolute",
    bottom: "0",
    right: "0",
    minWidth: "15px",
    height: "15px",
    backgroundColor: "white",
    color: "black",
    fontSize: "14px",
    borderRadius: "20%"
  }
});

const UserPanel = ({ history }) => {
  const classes = useStyles();
  const onButtonClick = url => {
    history.push(url);
  };
  const cartTotalCount = useSelector(state => state.cartTotalCount);
  const totalLikedSnikers = useSelector(state => state.totalLikedSnikers);

  return (
    <Box ml={2}>
      <IconButton
        aria-label="user"
        onClick={() => {
          onButtonClick("/login");
        }}
      >
        <AccountCircleSharpIcon className={classes.user} />
      </IconButton>
      <IconButton
        aria-label="liked"
        onClick={() => {
          onButtonClick("/liked");
        }}
      >
        <FavoriteIcon className={classes.user} />
        <div className={classes.cartIndicator}>
          {totalLikedSnikers}
        </div>
      </IconButton>
      <IconButton
        className={classes.cart}
        aria-label="cart"
        onClick={() => {
          onButtonClick("/cart");
        }}
      >
        <ShopIcon className={classes.user} />
        <div className={classes.cartIndicator}>
          {cartTotalCount}
        </div>
      </IconButton>
    </Box>
  );
};

export default withRouter(UserPanel);
