
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated){
	return (
	<div><h1>Oops, please Login First</h1></div>)		
  }

  const userComments = axios.get(`http://localhost:3005/users/comments/${user.sub}`);
	return (
		( 
		<div>
			<img src={user.picture} alt={user.name} />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<div className="comment-list">
				<div >
					Your Reviews:
				</div>
				<userComments/>
			</div>
		</div>

		)
	)}
 


export default Profile