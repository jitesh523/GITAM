import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/register", {
        username: username,
        password: password,
      });
      alert("Registration Success!");
    } catch (error) {
      alert("Registration Failed!");
      console.log("Error in registration", error);
    }
  }

  return (
    <div className="register">
      <h1>Hello user!</h1>
      <form onSubmit={register}>
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
        <p>Passwords are Hashed! (Enter strong password)</p>
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
