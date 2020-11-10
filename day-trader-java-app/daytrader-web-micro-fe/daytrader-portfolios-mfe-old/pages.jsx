import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import PortfolioApp from './src/app'

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: PortfolioApp,
  domElementGetter: () => document.getElementById("portfolio")
});

export const { bootstrap, mount, unmount } = reactLifecycles;
