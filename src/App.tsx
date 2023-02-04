import { Center, MantineProvider, Text } from "@mantine/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { TodoContextProvider } from "./context/TodoContext";
import AuthPage from "./pages/Auth/AuthPage";
import ComposePage from "./pages/Compose/ComposePage";
import HomePage from "./pages/Home/HomePage";
import LandingPage from "./pages/Landing/LandingPage";
import ProtectedAuth from "./utils/ProtectedRoute";

function App() {
	return (
		<AuthContextProvider>
			<TodoContextProvider>
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
					<Route
						path="/compose"
						element={
							<ProtectedAuth>
								<ComposePage />
							</ProtectedAuth>
						}
					/>
					<Route path="/auth" element={<AuthPage />} />
				</Routes>
			</TodoContextProvider>
		</AuthContextProvider>
	);
}

export default App;
