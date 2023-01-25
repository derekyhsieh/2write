import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Router>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: "light",
					colors: {
						"ocean-blue": [
							"#7AD1DD",
							"#5FCCDB",
							"#44CADC",
							"#2AC9DE",
							"#1AC2D9",
							"#11B7CD",
							"#09ADC3",
							"#0E99AC",
							"#128797",
							"#147885",
						],
					},
				}}
			>
				<App />
			</MantineProvider>
		</Router>
	</React.StrictMode>
);
