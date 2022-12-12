import { Center, MantineProvider, Text } from "@mantine/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ComposePage from "./pages/Compose/ComposePage";
import HomePage from "./pages/Home/HomePage";
import LandingPage from "./pages/Landing/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/compose" element={<ComposePage />} />
    </Routes>
  );
}

export default App;
