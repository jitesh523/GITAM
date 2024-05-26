import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./style.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
        /*{ withCredentials: true } is included as an option to instruct the browser to 
        include cookies in the request. This is crucial for maintaining the user's session 
        and authentication state across requests.
        */
      );
      if (response.status >= 200 && response.status < 300) {
        /* response.data :
        {username: 'Deepu', id: '6640615177563c43969815f9', iat: 1715526681}
        */
        setUserInfo(response.data);
        navigate("/community");
        // setRedirect(true);
      } else {
        alert("Wrong creds");
      }
    } catch (e) {
      alert("Login failed");
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Welcome back user!</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
