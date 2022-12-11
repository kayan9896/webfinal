import { useAuth0 } from "@auth0/auth0-react";
import UserComments from './UserComments';
import React, { useEffect, useState } from "react";
import axios from 'axios';


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    async function getUsers() {
      let { data } = await axios.get(`http://loocalhost:3005/user/${user.sub}`
      );
      // console.log(data);
      if (data.ok) setUserDetails(data.details);
    }
    getUsers();
  }, []);


  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    loginWithRedirect()
  }

  async function submitUpdateName() {
	const newName = document.getElementById("myText").value.length;
	if (!newName) {
		return alert("You did not enter any name!");
	  }
    let { data } = await axios.post(
      `http://loocalhost:3005//user/${user.sub}/update/`,
      {
        userId: user.sub,
		username: newName 
      }
    );
    if (data.ok) {
      alert("Your name been successfully updated!");
    } else alert("error");
  }

  return (
    isAuthenticated && (
      <div style={{padding:"5%"}}>
        <img src={user.picture} alt={userDetails.username} />
        <h2>{userDetails.username}</h2>
        <p>{user.email}</p>


		<input type="text" id="myText" defaultValue={userDetails.username} />
		<button onClick={submitUpdateName}>Update Your Nickname</button>

        <div>
          <UserComments />
        </div>
      </div>
    )
  )
}

export default Profile;