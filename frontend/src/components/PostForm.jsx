import React, { useState } from "react";
import Axios from "axios";

const PostForm = () => {
  const url = "http://localhost:7000/api/v1/findTheNearestHospital";
  const [data, setData] = useState({
    lat: "",
    lng: "",
  });
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }
  function handleSubmit(e) {
    e.preventDefault();
    Axios.post(url, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          onChange={(e) => handle(e)}
          id="lat"
          placeholder="latitude"

        ></input>
        <input
          onChange={(e) => handle(e)}
          id="lng"
          placeholder="longitude"
       
        ></input>
        <button>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
