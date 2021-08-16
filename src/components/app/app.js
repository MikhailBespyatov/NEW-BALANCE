import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./app.scss";
import { Header } from "../header";
import { Switch, Route } from "react-router";
import SnikerDetails from "../sniker-details/sniker-details";
import { SnikersServiceContext } from "../../snikers-service-context";
import { fetchSnikers } from "../../actions";
import SneakersList from "../sneakers-list";
import Spinner from "../spinner";
import Cart from "../cart";
import LoginPage from "../login-page";
import AuthContext from '../../auth-context';
import { Button, Grid, Typography, Box } from "@material-ui/core";
import { LogoutPage } from '../logout-page';
import SnikersCartApi from '../../snikers-cart-api';
import Storage from '../../storage';
import ErrorModal from "../error-modal";

export const App = () => {
  const snikersService = useContext(SnikersServiceContext);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const dispatch = useDispatch();
  const NBData = useSelector(state => state.NBData);
  const searchText = useSelector(state => state.searchText);
  const data = NBData.filter(it => it.name.toLowerCase().includes(searchText.toLowerCase()));
  const cartItems = useSelector(state => state.cartItems);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const snikersCartApi = new SnikersCartApi(authCtx.localId);
  const likedStorage = new Storage(`likedSnikers`, window.localStorage);

  useEffect(() => {
    if (data.length === 0) {
      fetchSnikers(dispatch, snikersService, likedStorage);
    }
  }, []);

  return (
    <>
      <Header />
      {error ? <ErrorModal /> : ''}
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            if (loading) {
              return <Spinner />;
            }

            return <SneakersList data={data} />;
          }}
        />
        <Route
          path="/man/"
          exact
          render={() => {
            if (loading) {
              return <Spinner />;
            }
            return <SneakersList data={data.filter(it => it.male === "man")} />;
          }}
        />
        <Route
          path="/woman/"
          exact
          render={() => {
            if (loading) {
              return <Spinner />;
            }
            return (
              <SneakersList data={data.filter(it => it.male === "woman")} />
            );
          }}
        />
        <Route
          path="/man/:id"
          render={({ match }) => {
            const { id } = match.params;

            if (loading) {
              return <Spinner />;
            }

            return <SnikerDetails likedStorage={likedStorage} snikersCartApi={snikersCartApi} data={data} id={Number(id)} />;
          }}
        />
        <Route
          path="/woman/:id"
          render={({ match }) => {          
            const { id } = match.params;

            if (loading) {
              return <Spinner />;
            }

            return <SnikerDetails likedStorage={likedStorage} snikersCartApi={snikersCartApi} data={data} id={Number(id)} />;
          }}
        />
        <Route
          path="/login/"
          render={() => { 
            if (isLoggedIn) {
              return <LogoutPage />
            }       
            return <LoginPage snikersCartApi={snikersCartApi}/>;
          }}
        />
        <Route
          path="/liked/"
          render={() => {
            if (loading) {
              return <Spinner />
            }
            const likedData = data.filter(it => it.liked);
            if (likedData.length === 0) {
              return <h1 style={{ textAlign: "center" }}>No liked snikers</h1>;
            }
            return <SneakersList data={likedData} />;
          }}
        />
        <Route
          path="/cart/"
          render={({history}) => {
            if (isLoggedIn) {
              return <Cart snikersCartApi={snikersCartApi} cartItems={cartItems}/>;
            } else {
              return (
                <Grid container alignItems="center" direction="column">
                  <Box mt={2}>
                  <Typography variant="h6" align="center" >
                    Что бы был доступ к корзине нужно авторизоваться
                  </Typography>
                  </Box>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={
                      () => {
                        history.push('/login')
                      }
                    }>Авторизоваться</Button>
                  </Box>
                  
                </Grid>
              
              );
            }
            
          }}
        />
      </Switch>
    </>
  );
};
