import PostForm from "./components/PostForm.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import {
  getFirebaseToken,
  onMessageListener,
} from "./firebase/fireabaseConfig";
import { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css'

function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    getFirebaseToken(setTokenFound);
  }, []);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      // console.log({ payload });
    })
    .catch((err) => console.log("failed: ", err));

  // inside the jsx being returned:
  if (isTokenFound) {
    console.log("Notification permission enabled 👍🏻");
  } else {
    console.log("Need notification permission ❗️");
  }

  const handleOk = () => {
    setShow(false);
    const hospital=JSON.parse(localStorage.getItem("user"))
    fetch("http://localhost:7000/api/v1/acceptRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
       request_id:notification.body,
       hospital_id:hospital.user._id
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setShow(false);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/takelocation" element={<PostForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <Modal title="Alert" open={show} onOk={handleOk} onCancel={handleCancel}>
        <p>You have new request...</p>
      </Modal>
    </>
  );
}

//onClick={closeModal}

export default App;
