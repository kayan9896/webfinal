import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";

export default function UserInformation() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { loginWithRedirect } = useAuth0();
	const [userDetails, setUserDetails] = useState({});
	
	useEffect(() => {
		async function getUsers() {
			let cmt = await fetch(`http://localhost:3005/users/user/${user.sub}`);
			const da = await cmt.json();
			if (cmt.ok) setUserDetails(da);
		}
		getUsers();
	}, [user.sub]);
	
	
	  async function submitUpdateName() {
		const newName = document.getElementById("myText").value;
		if (newName.length === 0) {
			return alert("You did not enter any name!");
		  }
		if (newName === userDetails.username){
			return alert("You did not make any change!");
		}
		let { data } = await axios.post(
		  `http://localhost:3005/users/user/${user.sub}/update`,
		  {
			userId: user.sub,
			username: newName 
		  }
		);
		console.log(data);
		if (data.ok) {
		  alert("Your name been successfully updated!");
		  window.location.reload()
		} else alert("error");
	  }

	  return (
		
		  <div style={{padding:"5%"}}>
			<img src={user.picture} alt={userDetails.username} />
			<h2>{userDetails.username}</h2>
			<p>{user.email}</p>
	
	
			<input type="text" id="myText" defaultValue={userDetails.username} />
			<button onClick={submitUpdateName}>Update Your Nickname</button>

		  </div>
		
	  )	

}

