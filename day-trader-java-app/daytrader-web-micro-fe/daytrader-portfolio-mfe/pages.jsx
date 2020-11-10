import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import QuotesApp from './src/app'

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: QuotesApp,
  domElementGetter: () => document.getElementById("quotes")
});

export const { bootstrap, mount, unmount } = reactLifecycles;
