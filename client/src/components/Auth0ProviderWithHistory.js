
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Auth0ProviderWithHistory({ children }) {
  let navigate = useNavigate();

  const redirect = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENTID}
      redirectUri={window.location.origin}
    //   onRedirectCallback={redirect}
    //   audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    >
      {children}
    </Auth0Provider>
  );
}