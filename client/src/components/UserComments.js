import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function UserComments() {
	const { user, isAuthenticated } = useAuth0();

	const cmt = axios.get(`http://localhost:3005/users/comments/${user.sub}`)
	if (!cmt.data){
		return <h3>Empty! You dont have any comments</h3>;
	}
	else return cmt.data;

}
