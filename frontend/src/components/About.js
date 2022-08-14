import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("http://localhost:7000/api/v1/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          window.location.href = "/";
        }
      }
    };
    checkLoggedIn();
  }, []);

  return <div className="about"></div>;
};

export default About;
