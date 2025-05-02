import React from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

import { useState } from 'react'

const friends = [
	{name: "John", age: 25},
	{name: "Jane", age: 30},
	{name: "Bob", age: 35},
	{name: "Alice", age: 28},
	{name: "Charlie", age: 22},

];

function Hooks() {
	const [count, setCount] = useState(0);
	const [friendsList, setFriendsList] = useState(friends);
	const [friendName, setFriendName] = useState("");

	const increment = () => setCount(count + 1);
	const decrement = () => setCount(count - 1);
	const reset = () => setCount(0);

	// Function to handle input change and update the state
	const handleInputChange = (e) => setFriendName(e.target.value);

	// Function to add a new friend to the list
	// and reset the input field
	const addFriend = () => {
		if (friendName.trim() !== "") {
			const newFriend = { name: friendName, age: Math.floor(Math.random() * 100) };
			setFriendsList([...friendsList, newFriend]);
			setFriendName("");
		}
	}

	
	return (	
		<main>
			<h1>Friends List</h1>
			<div className="d-flex flex-row">

			
			{ friendsList.map((friend, index) => (
				<div key={index} className="card-body text-center col-sm-3 m-2" style={{border: "1px solid black", borderRadius: "10px", backgroundColor: "lightblue"}}>
					<div className="row" style={{fontSize: 15}}><span>{index + 1}</span></div>
					<div className="row" style={{fontSize: 15}}><span>{friend.name}</span></div>
					<div className="row" style={{fontSize: 15}}><span>{friend.age}</span></div>
				</div>
			))}
			</div>
			c
			
			<div className="col-sm-12 mt-3 text-center">
				
				<span className="text-left">{friendName}</span>
				<input onChange={handleInputChange} type="text" className="form-control w-25" placeholder="Add a friend" />
				<button onClick={addFriend} 
				className="btn btn-primary mt-2">Add Friend</button>
			</div>
			
			<div className="col-sm-12 mt-3 text-center">
				<div className="row" style={{fontSize: 55}}><span>{count}</span></div>
				<button onClick={increment} className="btn btn-primary m-1"><CiSquarePlus style={{fontSize: 25}} /></button>
				<button onClick={decrement} className="btn btn-secondary m-1"><CiSquareMinus style={{fontSize: 25}} /></button>
				<button onClick={reset} className="btn btn-light m-1">Reset</button>
			</div>
			
			
		</main>
	)
}

export default Hooks;