import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
    localId: ''
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [localId, setLocalId] = useState(null);

    const userIsLoggedIn = Boolean(token);

    const loginHandler = (token, localId) => {
        setToken(token);
        setLocalId(localId);
    };

    const logoutHandler = () => {
        setToken(null);
        setLocalId(null);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        localId: localId,
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;