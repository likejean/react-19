import React from 'react';
import { Link, Outlet } from 'react-router-dom';
const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<div className="row justify-content-center">
				<img src="https://www.shutterstock.com/image-photo/home-page-icon-concept-on-260nw-535751713.jpg" width="450"	alt="default" />
				<div className="container text-center my-2">
					<a href="/login" className="btn btn-primary">User Page</a>
				</div>
			</div>	
		</div>
	)
}

export default Home
