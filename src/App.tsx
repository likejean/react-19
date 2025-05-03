//this is a simple React component that renders a section with the text "hello".
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Sensors from "./components/Sensors";
import Login from "./components/Login";
import Sensor from "./components/Sensor";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Sensors />} />
				<Route path="/login" element={<Login />} />
				<Route path="/sensor" element={<Sensor />} />
			</Routes>
		</BrowserRouter>	
	)
};

// This is the default export of the App component
export default App;