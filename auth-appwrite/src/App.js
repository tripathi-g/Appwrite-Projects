import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import userContext from "./utils/userContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { checkIsLoggedIn } from "./utils/useIsLoggedIn";

function App() {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    checkIsLoggedIn().then((res) => {
      setUserInfo(res);
    });
  }, []);

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <Outlet />
    </userContext.Provider>
  );
}

export default App;
