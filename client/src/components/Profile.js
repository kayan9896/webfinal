
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import UserComments from './UserComments';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated){
	return (
	<div><h1>Oops, please Login First</h1></div>)		
  }

//   async function getUserCmt() {
//     const cmt = await axios.get(`http://localhost:3005/users/comments/${user.sub}`)
//     return cmt.data
// }
// 	const UserComments = getUserCmt();

	return (
		( 
		<div>
			<img src={user.picture} alt={user.name} />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<div className="comment-list">
				<h3>Your Reviews:</h3>
				<UserComments/>
			</div>
		</div>

		)
	)}
 


export default Profile