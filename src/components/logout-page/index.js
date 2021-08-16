import React, {useContext, useRef, useState} from 'react';
import { Button, Box, Grid, TextField, Typography, InputAdornment } from "@material-ui/core";
import AuthContext from "../../auth-context";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch } from 'react-redux';
import { resetCartTotalCount } from '../../actions';

export const LogoutPage = () => {
    const authCtx = useContext(AuthContext);
    const logout = authCtx.logout;
    const newPasswordRef = useRef();
    const [error, setError] = useState(false);
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (evt) => {
        evt.preventDefault();
        const newPassword = newPasswordRef.current.value;
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBYxapdYMJviU2TyND92NJTj6n2X-sOKDc',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idToken: authCtx.token,
                    password: newPassword,
                    returnSecureToken: false
                })
            }
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    setError(true);
                    const errorMessage = data.error.message;
                    setErrorPasswordMessage(errorMessage);
                    setTimeout(() => {
                      setError(false);
                    }, 5000);
                })
            }
        }).catch(() => {
            setError(true);
            const errorMessage = 'Ошибка сети';
            setErrorPasswordMessage(errorMessage);
            setTimeout(() => {
                setError(false);
            }, 5000);
    });
}

    return (
        <>
          <Box mt={2}>
              <Grid container direction="column" alignItems="center" spacing={2}>
                  <Grid item xs>
                      <Typography variant="h5">
                          Ваша личная страница  
                      </Typography>
                  </Grid>
                  
                  <Grid item xs>
                    <form onSubmit={submitHandler}>
                        <Grid container direction="column" alignItems="center">
                          <TextField  
                          error={error}
                          helperText={error ? errorPasswordMessage : ''}
                          id="reset-password" 
                          label="Изменить пароль" 
                          type="password" 
                          InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                     <LockOpenIcon />
                                 </InputAdornment>
                            )
                           }}
                           inputRef={newPasswordRef}
                            />
                           <Button varian="contained" color="primary" type="submit">
                                изменить пароль
                            </Button>
                        </Grid>
                    </form>
                </Grid>

                  <Grid item xs>
                  <Button varian="contained" color="primary" onClick={() => {
                      logout();
                      dispatch(resetCartTotalCount());
                  }}>
                      Выйти из аккаунта
                  </Button>
                  </Grid>
                  
              </Grid>
          </Box>
        </>
    );
}