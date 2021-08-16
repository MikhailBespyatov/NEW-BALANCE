import React, {useContext, useEffect} from "react";
import { useDispatch } from "react-redux";
import { likeItemAction, sumLikedSnikers } from "../../actions";
import "./sneakers-list.scss";
import { SneakersItem } from "../sneakers-item/sneakers-item";
import { Container, Grid, Box } from "@material-ui/core";
import SnikersCartApi from '../../snikers-cart-api';
import AuthContext from "../../auth-context";

const SneakersList = ({ data }) => {
  const dispatch = useDispatch();
  const onLikeButtonClick = id => {
    dispatch(likeItemAction(id));
    dispatch(sumLikedSnikers());
  };
  const authCtx = useContext(AuthContext);
  const snikersCartApi = new SnikersCartApi(authCtx.localId);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Box mt={6} ml={3} mr={3} mb={15}>
      <Container fixed>
        <Grid container spacing={8}>
          {data.map(sneak => {
            return (
              <Grid className="sneakers-list-item" item xs key={sneak.id}>
                <SneakersItem
                  sneak={sneak}
                  id={sneak.id}
                  onLikeButtonClick={onLikeButtonClick}
                  isLoggedIn={isLoggedIn}
                  snikersCartApi={snikersCartApi}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default SneakersList;
