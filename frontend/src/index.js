import React from "react";
import ReactDOM from "react-dom/client";

import app from "./firebase/fireabaseConfig";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
