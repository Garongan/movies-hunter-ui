import HomePage from "./pages/HomePage";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <HomePage />
        </ThemeProvider>
    </Fragment>
  );
};

export default App;
