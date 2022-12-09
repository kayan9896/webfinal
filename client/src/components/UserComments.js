import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function UserComments() {
	const { user, isAuthenticated } = useAuth0();
	const [cm,setCm]=useState([]);
	// const [gameId, setGameId] = useState([]);
	
	useEffect(() => {
		async function getcms() {
		  let cmt = await fetch(`https://webfinal-server.onrender.com/users/comments/usercm/${user.sub}`);
		  const da = await cmt.json();
		  if (cmt.ok){
			setCm(da);
		  } 
		}
		getcms();

	  },[user.sub]);

	  console.log(cm);
		// for (let i=0; i<cm.length;i++) {
		// 	getGameDetails(cm[i].gameId)
			
		// }


		// async function getGameDetails (gameid){
		// 	const res = await fetch( `https://gamewebsite.onrender.com/game/${gameid}`)
		// 	let gameDetails;
		// 	if(res.ok){
		// 		const data = await res.json();
		// 		console.log(data);
		// 		gameDetails = data.details;
		// 	}
		// 	return gameDetails;
		// }
	
	if (cm.length === 0) {
		return <h4>You haven't made any comments</h4>}
	else {				
		return cm.map((i)=>{
			console.log(i);
			return <>
				<div className="row">
				<div className="column">
					<h4>Games</h4>
					<p>{i.gamename}</p>
				</div>	
				<div className="column">
					<h4>Your Comments</h4>
					<p>{i.Comment}</p>
					</div>
				</div>
			</>
		})
	}

}

