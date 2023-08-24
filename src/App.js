import IndexPage from "./pages/IndexPage";
import "./styles/reset.css";
import "./styles/fonts.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
const theme = {
  colors: {
    background: "#318eef",
    font: "#ffffff",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
