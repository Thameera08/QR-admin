import React, { useState } from "react";
import "./login.css";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);

  const handleLogin = async () => {
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
      const response = await fetch(
        "https://backscan.tfdatamaster.com/api/dashboard/login", // https://backscan.tfdatamaster.com
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        Cookies.set("token", data.token, { expires: 1 });
        navigate("/home");
        // Include further logic for a successful login
      } else {
        console.log("Login failed");
        setIsWrongCredentials(true); // Set wrong credentials state to true
        setTimeout(() => {
          setIsWrongCredentials(false); // Reset wrong credentials state after a delay
        }, 500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error
    }
  };

  const shakeButtonClass = isWrongCredentials ? "shake" : "";

  return (
    <div className="container">
      <div class="dots"></div>
      <img
        src="https://imgs.search.brave.com/0PB0SWkVa-yxGgW2sFiwVLGhvTsf8JGeMkosIsxe81M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/c3RvcmUtc3RhZmYt/Y2hlY2stbnVtYmVy/LXByb2R1Y3RzLXRo/YXQtbXVzdC1iZS1k/ZWxpdmVyZWQtY3Vz/dG9tZXJzLWR1cmlu/Zy1kYXlfMTE1MC01/MTA3OS5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw"
        alt="backgroundImg"
      />
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <PersonIcon className="icon1" />
          <input
            type="text"
            className="custom-input"
            placeholder="enter your username...."
          />
        </div>
        <div className="input">
          <KeyIcon className="icon1" />
          <input
            type="password"
            className="custom-input"
            placeholder="enter your password.."
          />
        </div>
      </div>
      <div className="submit-container">
        <div className={`submit ${shakeButtonClass}`} onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
