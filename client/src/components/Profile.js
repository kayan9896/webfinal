import { useAuth0 } from "@auth0/auth0-react";
import UserComments from './UserComments';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import UserInformation from "./UserInformation";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();


  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    loginWithRedirect()
  }

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

export default Profile;