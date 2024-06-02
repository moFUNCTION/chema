import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UserDataProvider } from "./Context/UserDataProvider/UserDataProvider.jsx";
// 2. Add your color mode config
const lightModeTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false, // Disable system color mode toggle
  },
});
localStorage.setItem("chakra-ui-color-mode", "light");

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider theme={lightModeTheme}>
      <UserDataProvider>
        <App />
      </UserDataProvider>
    </ChakraProvider>
  </BrowserRouter>
);
