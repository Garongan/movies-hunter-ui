import HomePage from "./pages/HomePage";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter basename="/">
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <HomePage />
        </ThemeProvider>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
