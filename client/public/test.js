function loadscript() {
  const element = document.getElementsByTagName("script")[0];
  const fjs = element;
  const js = document.createElement("script");
  js.src = "https://apis.google.com/js/platform.js";
  if (fjs && fjs.parentNode) {
    fjs.parentNode.insertBefore(js, fjs);
  } else {
    document.appendChild(js);
  }
  js.onload = loaded;
}

function loaded() {
  console.log("loaded");
  window.gapi.load("auth2", function() {
    console.log("auth2 loaded");
    window.gapi.auth2
      .init({
        client_id:
          "456623575376-raqd0o5afgrvli16b49hqg2m2d18sf98.apps.googleusercontent.com"
      })
      .then(onInit, onError);
  });
}
loadscript();

function onInit() {
  console.log("onInit");
  const gAuth = window.gapi.auth2.getAuthInstance();
  console.log("is signed in", gAuth.isSignedIn.get());
}
function onError() {
  console.log("onError");
}
