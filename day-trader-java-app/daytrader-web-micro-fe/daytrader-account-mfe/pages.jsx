import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import AccountsApp from './src/App'

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: AccountsApp,
  domElementGetter: () => document.getElementById("accounts")
});

export const { bootstrap, mount, unmount } = reactLifecycles;
