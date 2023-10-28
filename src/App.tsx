import HomePage from "./pages/HomePage";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      {/* 
        @ThemeProvider for dark and light theme switch by ui.shadcn framework
        * default ui theme is following by system
        * change the value defaultTheme by system, light, and dark
        * don't change the storageKey
       */}
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <HomePage />
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
