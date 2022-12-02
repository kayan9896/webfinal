import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserComments() {
	const { user, isAuthenticated } = useAuth0();
	const [cm,setCm]=useState([]);
	useEffect(() => {
		async function getcms() {
		  let cmt = await fetch(`https://gamewebsite.onrender.com/users/comments/usercm/${user.sub}`);
		  const da = await cmt.json();
		  if (cmt.ok) setCm(da);
		  console.log(da);
		}
		getcms();
	  }, [user.sub]);
	return(
		cm.map((i)=>{return <p>{i.Comment}</p>})
	)

}
