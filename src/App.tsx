import { Center, MantineProvider, Text } from "@mantine/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import AuthPage from "./pages/Auth/AuthPage";
import ComposePage from "./pages/Compose/ComposePage";
import HomePage from "./pages/Home/HomePage";
import LandingPage from "./pages/Landing/LandingPage";
import ProtectedAuth from "./utils/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedAuth>
              <HomePage />
            </ProtectedAuth>
          }
        />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/compose" element={<ComposePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
