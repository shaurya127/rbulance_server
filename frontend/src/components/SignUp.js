import { React, useState } from "react";
import "../components/App.css";
const SignUp = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();
    // check whether user has entered all the fields
    if (email.length === 0 || password.length === 0 ) {
        alert("Please enter all the fields");
        return;
    }

    // check whether the user is already registered
    
    fetch("http://localhost:7000/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };



  return (
    <div className="signup">
      <h1>SignUP</h1>
      <form className="form-group">
      <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

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


        <button className="btn" onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
