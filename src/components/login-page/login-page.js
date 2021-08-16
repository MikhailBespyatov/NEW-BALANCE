import React, { useRef, useState, useContext } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  InputAdornment,
  makeStyles,
  Button
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AuthContext from "../../auth-context";
import { useDispatch } from "react-redux";
import SnikersCartApi from '../../snikers-cart-api';
import { fetchCartItems } from '../../actions';

const useStyles = makeStyles({
  textField: {
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorSingInMessage, setErrorSingInMessage] = useState("");
  const [errorSingUpMessage, setErrorSingUpMessage] = useState("");
  const classes = useStyles();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const onSubmit = evt => {
    evt.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    //добавить валидацию формы
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYxapdYMJviU2TyND92NJTj6n2X-sOKDc";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYxapdYMJviU2TyND92NJTj6n2X-sOKDc";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMessage;
            if (isLogin) {
              setError(true);
              errorMessage = `Ошибка входа`;
              setErrorSingInMessage(errorMessage);
              setTimeout(() => {
                setError(false);
              }, 5000);
            } else {
              setError(true);
              errorMessage = `Ошибка регистрации`;
              setErrorSingUpMessage(errorMessage);
              setTimeout(() => {
                setError(false);
              }, 5000);
            }
          });
        }
      })
      .then(data => {
        authCtx.login(data.idToken, data.localId);
        const snikersCartApi = new SnikersCartApi(data.localId);
        fetchCartItems(dispatch, snikersCartApi);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
        setErrorSingInMessage("Ошибка сети");
        setErrorSingUpMessage("Ошибка сети");
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
  };

    return (
      <Box mt={2}>
        <Container fixed>
          <Grid container justifyContent="center">
            <form className={classes.form} onSubmit={onSubmit}>
              <TextField
                error={error}
                helperText={
                  error
                    ? isLogin ? errorSingInMessage : errorSingUpMessage
                    : ""
                }
                id="email"
                label="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                className={classes.textField}
                inputRef={emailInputRef}
                type="email"
              />
              <TextField
                error={error}
                helperText={
                  error
                    ? isLogin ? errorSingInMessage : errorSingUpMessage
                    : ""
                }
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon />
                    </InputAdornment>
                  )
                }}
                className={classes.textField}
                inputRef={passwordInputRef}
              />
              <Box mb={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {isLogin
                    ? `${isLoading ? "Входим..." : "Войти"}`
                    : `${isLoading
                        ? "Регистрируемся..."
                        : "Зарегестрироваться"}`}
                </Button>
              </Box>
              <Button
                color="secondary"
                onClick={() => {
                  setIsLogin(isLogin => !isLogin);
                }}
              >
                {isLogin
                  ? "Перейти в меню регистрации"
                  : "Перейти в меню входа"}
              </Button>
            </form>
          </Grid>
        </Container>
      </Box>
    );
};

export default LoginPage;
