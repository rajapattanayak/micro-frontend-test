import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  // if provided then use default history or else use memory history
  const history =
    defaultHistory ||
    createMemoryHistory({
      //memory history thinks that we are at root "/", we need to tell otherwise
      // i.e we are serving from /auth/login or /auth/signin
      // this comes from parentapp (container) navigation
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location; //marketing level
      if (pathname !== nextPathname) {
        // update marketing memory history object
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");

  if (devRoot) {
    // In isolation use browser history
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
