import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SidebarContextProvider } from "./store/sidebarContext";
// import { LangContextProvider } from "./store/langContext";
import { ThemeContextProvider } from "./store/themeContext";
import { LoginContextProvider } from "./store/loginContext";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    {/* <LangContextProvider> */}
    {/* <LoginContextProvider> */}
    <ThemeContextProvider>
      <SidebarContextProvider>
        <App />
      </SidebarContextProvider>
    </ThemeContextProvider>
    {/* </LoginContextProvider> */}
    {/* </LangContextProvider> */}
  </Provider>,
  document.getElementById("root")
);
