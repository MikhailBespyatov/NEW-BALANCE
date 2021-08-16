import React, { useContext } from "react";
import "./sniker-details.scss";
import { useDispatch, useSelector } from "react-redux";
import { likeItemAction, fetchAddCartItem, sumLikedSnikers } from "../../actions";
import ShopIcon from "@material-ui/icons/Shop";
import {
  Button,
  Typography,
  IconButton,
  Grid,
  Box,
  Divider,
  makeStyles,
  Tooltip,
  Zoom,
  Container
} from "@material-ui/core";
import FavoriteSharpIcon from "@material-ui/icons/FavoriteSharp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AuthContext from "../../auth-context";

const useStyles = makeStyles({
  list: {
    flex: 4
  },
  img: {
    flex: 1
  },
  buttonGroup: {
    flex: 2,
    textAlign: "end"
  }
});

const SnikerDetails = ({ id, data, likedStorage, snikersCartApi }) => {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const dispatch = useDispatch();
  const cartLoading = useSelector(state => state.cartLoading);
  const cartError = useSelector(state => state.cartError);

  const item = data.find(it => it.id === id);

  const { name, liked, img, price, description } = item;

  const likedButton = liked ? <FavoriteSharpIcon /> : <FavoriteBorderIcon />;

  const onCartButtonClick = () => {
    if (cartLoading) {
      return;
    }
    if (isLoggedIn) {
      fetchAddCartItem(dispatch, snikersCartApi, item);
    } else {
      return;
    }
  };

  const onLikeButtonClick = id => {
    dispatch(likeItemAction(id));
    dispatch(sumLikedSnikers());
    if (liked) {
      likedStorage.removeLikedSniker(id);
    } else {
      likedStorage.setLikedSniker(id, { ...item, liked: !liked });
    }
  };

  const cartButtonTitle = !cartError
    ? isLoggedIn
      ? !cartLoading ? "Добавить в корзину" : "Добавляем в корзину"
      : "Добавить в корзину можно только после авторизации"
    : "Ошибка загрузки";

  const likeButtonTitle = !liked
    ? "Добавить в избранное"
    : "Убрать из избранного";

  return (
    <Box mt={2}>
      <Container fixed>
        <Grid container spacing={10}>
          <Grid className={classes.img} item>
            <img
              className="sniker-details-image"
              src={img}
              width="200"
              height="125"
              alt="Изображение кросовка"
            />
          </Grid>

          <Grid className={classes.list} item>
            <Box mb={2}>
              <Typography variant="h5" align="left">
                {name}
              </Typography>
            </Box>

            <Box mb={1}>
              <Typography variant="h6" align="left">
                {price}
              </Typography>
            </Box>
            <Divider />

            <Box mt={2}>
              <Typography align="left">
                {description}
              </Typography>
            </Box>
          </Grid>

          <Grid className={classes.buttonGroup} item>
            <Tooltip
              TransitionComponent={Zoom}
              title={cartButtonTitle}
              placement="bottom"
            >
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "rgb(61, 156, 48)",
                  color: "white"
                }}
                startIcon={<ShopIcon />}
                onClick={() => {
                  onCartButtonClick(id);
                }}
              >
                В корзину
              </Button>
            </Tooltip>
            <Tooltip
              TransitionComponent={Zoom}
              title={likeButtonTitle}
              placement="top"
            >
              <IconButton
                style={{ color: "tomato" }}
                onClick={() => {
                  onLikeButtonClick(id);
                }}
              >
                {likedButton}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SnikerDetails;
