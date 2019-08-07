import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { GoogleLogin, GoogleLogout } from "./GoogleLogin";
function init() {
  window.gapi.load("auth2", function() {
    console.log("ues");
  });
}
function signOut() {
  var auth2 = window.gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}
let id_token;
function onSuccess(userInfo) {
  // var profile = googleUser.getBasicProfile();
  // console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log("Name: " + profile.getName());
  // console.log("Image URL: " + profile.getImageUrl());
  // console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  // id_token = profile.getEmail(); //googleUser.getAuthResponse().id_token;
  // console.log(id_token);
  console.log(userInfo);
}

function onRequest() {
  console.log("onRequest");
}
function onFailure(error) {
  console.log(error);
}

function onLogoutSuccess() {
  console.log("onLogoutSuccess");
}
function App() {
  return (
    <div>
      <GoogleLogin
        loginText="Login with Google"
        googleAuthApiSrc="https://apis.google.com/js/platform.js"
        clientID="RIbbos"
        disabled={false}
        onRequest={onRequest}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <GoogleLogout
        logoutText="Logout from App"
        googleAuthApiSrc="https://apis.google.com/js/platform.js"
        clientID={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        disabled={false}
        onLogoutSuccess={onLogoutSuccess}
      />
      <p>{id_token}</p>
      <a href="#" onClick={signOut}>
        Sign out
      </a>
    </div>
  );
}

export default App;
