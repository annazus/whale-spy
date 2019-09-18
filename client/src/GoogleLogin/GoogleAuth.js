import React, { useEffect, useState } from "react";

const useGoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);

  const initGoogleAuth = () => {
    window.gapi.load("auth2", () => {
      const gAuth = window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        cookie_policy: "single_host_origin",
        fetch_basic_profile: true,
        ux_mode: "popup"
      });

      gAuth.then(
        googleAuth => {
          const signedIn = googleAuth.isSignedIn.get();
          setIsSignedIn(signedIn);
          const googleUser = googleAuth.currentUser.get();
          const profile = googleUser.getBasicProfile();
          const {
            access_token,
            id_token,
            expires_in
          } = googleUser.getAuthResponse(true);
          const userInfo = {
            name: profile.getName(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl(),
            accessToken: access_token,
            idToken: id_token
          };
          setGoogleUser(userInfo);
          //   if (refreshToken) refreshToken(expires_in);
        },
        error => {
          // onFailure(error);
        }
      );
    });
  };

  const loadScript = () => {
    const firstScriptTag = document.getElementsByName("script")[0];
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://apis.google.com/js/platform.js";
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(firstScriptTag, scriptElement);
    } else {
      document.head.appendChild(scriptElement);
    }
    scriptElement.onload = initGoogleAuth;
  };

  useEffect(() => {
    loadScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isSignedIn, googleUser };
};
export { useGoogleAuth as default };
