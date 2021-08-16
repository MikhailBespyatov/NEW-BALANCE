import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { snikersService } from "./snikers-service";
import { SnikersServiceContext } from "./snikers-service-context";
import { AuthContextProvider } from './auth-context';

import "./index.scss";

ReactDOM.render(
  <AuthContextProvider>
    <Provider store={store}>
      <SnikersServiceContext.Provider value={snikersService}>
        <Router>
          <App />
        </Router>
      </SnikersServiceContext.Provider>
    </Provider>
  </AuthContextProvider>,
  document.getElementById("root")
);
