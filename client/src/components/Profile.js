
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';
import UserComments from './UserComments';

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
      <div style={{padding:"5%"}}>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          <UserComments />
        </div>
      </div>
    )
  )
}

export default Profile;