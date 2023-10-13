import HomePage from "./pages/HomePage";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <HomePage/>
    </ThemeProvider>
  )
};

export default App;
