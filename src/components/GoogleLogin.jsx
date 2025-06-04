import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
const clientId = '692536017427-ljts30ab2ndnpb5qv3j5k4q4ma71f0dt.apps.googleusercontent.com';

const handleSucces = async (token, navigate, method) => {
  try {
    const res = await api.post("/api/auth/google/", { token, method });
    localStorage.setItem(ACCESS_TOKEN, res.data.access);
    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
    navigate("/profile")
  }
  catch (error) {
    alert(error.response.data);
  }
};
const onFailure = () => {
  alert('An error occurred. Please try again');
};

function GoogleSignIn(method) {
  const navigate = useNavigate();
  const onSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    handleSucces(token, navigate, method);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleSignIn;