import "./App.css";
import NavBar from "./component/navbar";
import Home from "./component/home";
import Profile from "./component/profile";
import Login from "./component/login";
import Signup from "./component/signup";
import Gallery from "./component/gallery";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect, useContext } from "react";
import { GlobalContext } from "./context";
import axios from "axios";

function App() {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const getProfile = async () => {
      let baseUrl = "http://localhost:5001";
      try {
        let response = await axios({
          url: `${baseUrl}/Profile`,
          method: "get",
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("response: ", response.data);
          dispatch({
            type: "USER_LOGIN",
            payload: response.data,
          });
        } else {
          dispatch({
            type: "USER_LOGOUT",
          });
        }
      } catch (e) {
        console.log("Error in api call: ", e);
        dispatch({
          type: "USER_LOGOUT",
        });
      }
    };
    getProfile();
  }, []);

  return (
    <Router>
      <NavBar />

      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
