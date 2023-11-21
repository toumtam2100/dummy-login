import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const LoggedIn = ({ setIsLoggedIn, loggedInUser }) => {
  const navigate = useNavigate();

  // Function to get the appropriate title based on the logged-in user
  const getTitle = () => {
    if (loggedInUser === "tam") {
      return "Welcome back! The CEO of LGBTQ community.";
    } else {
      return (`Welcome ${loggedInUser}! Now you are a part of LGBTQ community.`);
    }
  };

  return (
    <>
      <h1 className="title">{getTitle()}</h1>
      <button
        className="logout_button"
        onClick={() => {
          setIsLoggedIn(false);
          navigate("/");
        }}
      >
        Log out
      </button>
    </>
  );
};

export default LoggedIn;