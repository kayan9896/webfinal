
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const { sid } = useParams();
  async function getComments() {
    let commentData = await axios.get(
      `http://localhost:3005/users/comments/${sid}`
    );
	return commentData.data;
  }
  const comments= getComments();

  if (isAuthenticated){
  	return (
		( 
		<div>
			<img src={user.picture} alt={user.name} />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
			if (!comments){
				<p>Empty! You did not make any comments yet.</p>
			}
			else{
				<p>{comments}</p>
			}
		</div>
		)
  )}
  else{
	return (	
		<div><h1>Oops, please Login First</h1></div>
	)
  }
}

export default Profile