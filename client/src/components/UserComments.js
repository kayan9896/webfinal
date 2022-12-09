import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserComments() {
	const { user, isAuthenticated } = useAuth0();
	const [cm, setCm] = useState([]);
	useEffect(() => {
		async function getcms() {
			let cmt = await fetch(`https://kayan9896server.onrender.com/users/comments/usercm/${user.sub}`);
			const da = await cmt.json();
			if (cmt.ok) setCm(da);
			console.log(da);
		}
		getcms();
	}, [user.sub]);
	if (cm.length === 0) {
		return <h4>You haven't made any comments</h4>
	}
	else {
		return cm.map((i)=>{
			return <>
				<div>
					<div>
						<h4>Games</h4>
						<p>{i.gname}</p>
					</div>	
					<div>
						<h4>Your Comments</h4>
						<p>{i.Comment}</p>
					</div>
				</div>
			</>
		})
	}

}

