import { React, useState } from "react";
import "../components/App.css";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("firebaseToken");

  const handleSubmit = (e) => {
    e.preventDefault();
    // check whether user has entered all the fields
    if (email.length === 0 || password.length === 0) {
      alert("Please enter all the fields");
      return;
    }

    // check whether the user is already registered

    fetch("http://localhost:7000/api/v1/getHospitals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        // location: { "type":"Point","coordinates":[40.730610, -73.935242] },
        address,
        hospital_device_id: token,
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
        {/* <input
          type="text"
          placeholder="Enter Longitude"
          onChange={(e) => {
            setLongitude(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Latitude"
          onChange={(e) => {
            setLatitude(e.target.value);
          }}
        /> */}
        <input
          type="text"
          placeholder="Enter Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        <button className="btn" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
