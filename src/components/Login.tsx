import React from 'react'
import { useState } from 'react'

const Login = () => {

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const userLogout = () => {
		localStorage.removeItem("token");	
		localStorage.removeItem("userId");
		localStorage.removeItem("email");
		alert("You have been logged out.");
		window.location.reload(); // Reload the page to reflect the logout
	}

	// Function to handle login
	// It prevents the default form submission behavior and sends a POST request to the server with the email and password.
	const handleLogin = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();	

	
		// Check if email and password are provided
		if (!email || !password) {
			alert("Please enter both email and password.");
			return;
		}
		const response = await fetch('http://localhost:5000/api/users/login', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),	
		})
		const data = await response.json();
		if (response.status !== 200) {
			alert("Login failed. Please check your credentials.");
			return;
		}
		if (response.status === 200) {
			localStorage.setItem("token", data.token);
			localStorage.setItem("userId", data.userId);
			localStorage.setItem("email", email);
			window.location.reload(); // Reload the page to reflect the login
		
		}
		
	}

	return (
		<div className='container mt-5'>
			<div className="row justify-content-center">
				<h1 className='text-center w-100'>Login</h1>
				<form onSubmit={handleLogin}>
					<h2>Login to your account</h2>
					<p>Welcome back!</p>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email address :</label>
						<input onChange={e => {setEmail(e.target.value)}} type="email" className="form-control" id="email"/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">Password :</label>
						<input onChange={e => {setPassword(e.target.value)}} type="password" className="form-control" id="password"/>
					</div>
					<button type="submit" className="btn btn-primary">LOG IN</button>
					<button type="button" onClick={userLogout} className="btn btn-secondary ms-2">LOG OUT</button>
					<p><br />Demo User: <br />Email: user@example.com <br />Password: password12345</p>
                </form>
			</div>
		
		</div>
	)
}

export default Login
