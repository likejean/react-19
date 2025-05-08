import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import "../beaurify.css"


const Login = () => {

	const location = useLocation();
    const isReload = new URLSearchParams(location.search).get('reload') === 'true';

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [token, setToken] = useState<string>(localStorage.getItem("token") || "")
	const navigate = useNavigate();

	const userLogout = () => {
		localStorage.removeItem("token");	
		localStorage.removeItem("userId");
		localStorage.removeItem("email");
		setToken("");
		window.location.reload(); // Reload the page to reflect the logout
	}

	useEffect(() => {
		if (isReload) {
			localStorage.removeItem("token");	
			localStorage.removeItem("userId");
			localStorage.removeItem("email");
			setToken("");
		  // Perform actions specific to page reload
		}
	}, [isReload]);
	
  
	// It prevents the default form submission behavior and sends a POST request to the server with the email and password.
	const handleLogin = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();	

	
		// Check if email and password are provided
		if (!email || !password) {
			alert("Please enter both email and password.");
			return;
		}
		
		//use http://localhost:5000 for local server
		const response = await fetch('https://express-srv.onrender.com/api/users/login', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),	
		})
		
		const data = await response.json();
		if (response.status === 200) {	
			localStorage.setItem("token", data.token);
			localStorage.setItem("userId", data.user.userId);
			localStorage.setItem("email", data.user.email);	
			setToken(data.token);		
			navigate("/sensors", { state: { email: data.user.email, userId: data.user.userId } }); // Redirect to the login page after logout
			window.location.reload(); // Reload the page to reflect the login
		}else{
			alert("Login failed. Please check your credentials.");
			return;
		}
		
	}

	return (
		<div className='container mt-5 w-50'>
			<div className="row justify-content-center">
				<h1 className='text-center'>Login</h1>
				<form onSubmit={handleLogin}>
					{!token ?<h2>Login to your account</h2>:<h2>You are logged in</h2>}
					<p>Welcome back!</p>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email address :</label>
						<input onChange={e => {setEmail(e.target.value)}} type="email" className="form-control" id="email"/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">Password :</label>
						<input onChange={e => {setPassword(e.target.value)}} type="password" className="form-control" id="password"/>
					</div>
					{!token ? <button type="submit" className="btn btn-primary">LOG IN</button> :
					<button type="button" onClick={userLogout} className="btn btn-secondary">LOG OUT</button>}
					
					<p><br />Demo User: <br />Email: user@example.com <br />Password: password12345</p>
                </form>
				<div className="container text-center my-2">
					<a href="/" className="btn btn-outline-primary">Home Page</a>
				</div>
			</div>
		
		</div>
	)
}

export default Login
