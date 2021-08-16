import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDecreaseFromCart,
  fetchRemoveFromCart,
  fetchAddCartItem
} from "../../actions";
import "./cart.scss";
import {
  Box,
  Container,
  Grid,
  Button,
  ButtonGroup,
  makeStyles,
  Typography,
  Tooltip,
  Zoom
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Spinner from "../spinner";
import ErrorModal from "../error-modal";

const useStyles = makeStyles({
  container: {
    position: 'relative'
  },
  name: {
    minHeight: "120px",
    verticalAlign: "center",
    maxWidth: '200px'
  },
  price: {
    marginBottom: "40px"
  }
});

const Cart = ({ snikersCartApi }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cartData = useSelector(state => state.cartItems);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const cartLoading = useSelector(state => state.cartLoading);
  const cartError = useSelector(state => state.cartError);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorModal />;
  }

  if (cartData.length === 0) {
    return <h1 style={{ textAlign: "center" }}>No snikers in the cart</h1>;
  }

  return (
    <Box mt={6} mb={6} ml={3} mr={3}>
    <Container fixed>
      <Grid container className={classes.container} spacing={8}>
        {cartData.map(it => {
          const { id, img, name, total, count } = it;

          const onAddClick = () => {
            if (cartLoading) {
              return;
            } else {
              fetchAddCartItem(dispatch, snikersCartApi, it);
            }
          };

          const onDeleteClick = () => {
            if (cartLoading) {
              return;
            } else {
              fetchRemoveFromCart(dispatch, snikersCartApi, it);
            }
          };

          const onDecreaseClick = () => {
            if (cartLoading) {
              return;
            } else {
              if (it.count <= 1) {
                fetchRemoveFromCart(dispatch, snikersCartApi, it);
              } else {
                fetchDecreaseFromCart(dispatch, snikersCartApi, it);
              }
            }
          }

          const getTooltipTitle = (loadedTitle, loadingTitle) => {
            return !cartError
              ? (!cartLoading ? loadedTitle : loadingTitle)
              : "Ошибка загрузки";
          };

          const addButtonTitle = getTooltipTitle("Добавить", "Добавляем...");

          const decreaceButtonTitle = getTooltipTitle("Убавить", "Убавляем...");

          const removeButtonTitle = getTooltipTitle("Удалить", "Удаляем...");

          return (
            <Grid item key={id} className="sneakers-list-item" xs>
              <img src={img} alt="img" width="202" height="152" />
              <Typography className={classes.name} variant="h5">
                {name}
              </Typography>

              <Typography className={classes.price} variant="h6">
                {count > 1 ? `${count}x ` : ""} {total}Р
              </Typography>
                <ButtonGroup
                  className={classes.buttonGroup}
                  variant="contained"
                  aria-label="button-group"
                >
                  
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={addButtonTitle}
                    placement="top"
                  >
                    <Button
                      onClick={onAddClick}
                      style={{ backgroundColor: "#000", color: "#fff" }}
                    >
                      <AddIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    TransitionComponent={Zoom}
                    title={decreaceButtonTitle}
                    placement="top"
                  >
                    <Button
                      onClick={onDecreaseClick}
                      style={{ backgroundColor: "#000", color: "#fff" }}
                    >
                      <RemoveIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    TransitionComponent={Zoom}
                    title={removeButtonTitle}
                    placement="top"
                  >
                    <Button
                      onClick={onDeleteClick}
                      style={{ backgroundColor: "#000", color: "#fff" }}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
            </Grid>
          );
        })}
      </Grid>
    </Container>
    </Box>
  );
};

export default Cart;
