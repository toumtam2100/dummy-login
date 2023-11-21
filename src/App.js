import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoggedIn from "./Components/loggedin/loggedin";
import LoginForm from "./Components/loginpage/loginpage";
import { database } from "./data/database";

const PrivateRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser") || null
  );

  const handleLogin = (username, password) => {
    const user = database.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", username);
      setIsLoggedIn(true);
      setLoggedInUser(username);
    } else {
      console.log("Incorrect information");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/loggedin" />
            ) : (
              <LoginForm handleLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/loggedin"
          element={
            <PrivateRoute
              element={<LoggedIn setIsLoggedIn={handleLogout} loggedInUser={loggedInUser} />}
              isLoggedIn={isLoggedIn}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
