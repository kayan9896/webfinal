import { useAuth0 } from "@auth0/auth0-react";
import UserComments from './UserComments';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import UserInformation from "./UserInformation";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const [userDetails, setUserDetails] = useState({});

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }
//   if (!isAuthenticated) {
//     loginWithRedirect()
//   }


	async function checkIfUserInDb() {
		try {
			let response = await fetch("http://localhost:3005/users/userlist")
			const da = await response.json();

			console.log(da);

			const found = da.find(element=> element.userId === user.sub);

			if (!found) {
				console.log("in");
				let { data } = await axios.post(
					`http://localhost:3005/users/user/new`,
					{
						userId: user.sub,
						username: user.nickname,
					});
				console.log(data);
				if (data.ok) {
					alert("Welcome");
				  } else alert("error");
			}
		} catch (e) {
			console.log(e);
		}
	}

	if (isAuthenticated){
		checkIfUserInDb();

		 return (
			isAuthenticated && (
			<div>
				<div>
				<UserInformation />
				</div>

				<div>
				<UserComments />
				</div>
			</div>
			)
		)
	}
	else{
		loginWithRedirect()
	}
 
}

export default Profile;