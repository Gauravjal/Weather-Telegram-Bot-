import React, { useState, useEffect } from "react";
import "./App.css";
import GoogleLogin from "react-google-login";
import AdminPanel from "./AdminPanel"; // Import your AdminPanel component
import { gapi } from "gapi-script";
function App() {
  let client_id =
    "657867082819-b18cmruvk7lq6gketv40rv2nubb8kelp.apps.googleusercontent.com";

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "657867082819-b18cmruvk7lq6gketv40rv2nubb8kelp.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleFailure = (result) => {
    console.log(result);
    alert(result.error);
  };

  const handleLogin = (googleData) => {
    // Handle Google Sign-In data directly on the client side
    const profile = googleData.getBasicProfile();
    const userData = {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl(),
    };

    setLoginData(userData);
    localStorage.setItem("loginData", JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Admin Panel</h3>
        <div>
          {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button style={{color:'white',backgroundColor:'blue',cursor:'pointer'}} onClick={handleLogout}>Logout</button>
              {/* Render the admin panel component when user is logged in */}
              <AdminPanel />
            </div>
          ) : (
            <GoogleLogin
            style={{
              cursor:'pointer'
            }}
              clientId={client_id}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
              plugin_name="hello"
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
