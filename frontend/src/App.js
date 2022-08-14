import PostForm from "./components/PostForm.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
function App() {
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
    </>
  );
}

export default App;
