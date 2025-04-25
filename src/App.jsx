//this is a simple React component that renders a section with the text "hello".
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App = () => {
	return (
		<>
			<Header />
			<Main />
			<Footer />
		</>
	)
};

// This is the default export of the App component
export default App;