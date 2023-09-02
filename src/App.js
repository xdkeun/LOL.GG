import IndexPage from "./pages/IndexPage";
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/root.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import FindPage from "./pages/FindPage";
import RotationPage from "./pages/RotationPage";
import RankingPage from "./pages/RankingPage";
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
          <Route path="/find/:param" element={<FindPage />} />
          <Route path="/rotation" element={<RotationPage />} />
          <Route path="/ranking" element={<RankingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
