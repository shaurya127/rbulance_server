// make a login component

import { React, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // check whether user has entered all the fields
    if (email.length === 0 || password.length === 0) {
        alert("Please enter all the fields");
        return;
    }

    // api call to check whether the user is registered
    fetch("http://localhost:7000/api/v1/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })

        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // if user is registered, redirect to home page
          if (data.success) {
            window.location.href = "/";
          }
          // if user is not registered, alert the user
          else {
            alert("User is not registered");
          }
            
        }
        )
        .catch((err) => console.log(err));
    };


   
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="form-group">
        <input
          type="email"
          placeholder="Enter your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button className="btn" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};
export default Login;
