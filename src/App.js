import "./App.css";
import { GlobalProvider } from "./context/GlobalState";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import CoinDetails from "./pages/CoinDetails";

function App() {
	return (
		<Router>
			<GlobalProvider>
				<Layout>
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/coin/:id" element={<CoinDetails />} />
					</Routes>
				</Layout>
			</GlobalProvider>
		</Router>
	);
}

export default App;
