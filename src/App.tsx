//this is a simple React component that renders a section with the text "hello".
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Sensors from "./components/Sensors";
import Login from "./components/Login";

const App = () => {
	return (
		<>
		    <Login />
			<Sensors />
		</>
	)
};

// This is the default export of the App component
export default App;