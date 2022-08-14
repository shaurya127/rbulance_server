import React, { useEffect } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import About from './About';
import PostForm from './PostForm';
const Home = () => {


  useEffect(() => {
    fetch("http://localhost:7000/api/v1/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);


return (
  <>
  <Nav>
    <Bars />

    <NavMenu>
    <NavLink to='/takelocation' activeStyle>
      PostForm
    </NavLink>
    <NavLink to='/about' activeStyle>
      About
    </NavLink>
   
    <NavLink to='/register' activeStyle>
      Sign Up
    </NavLink>
    </NavMenu>
    <NavBtn>
    <NavBtnLink to='/login'>Sign In</NavBtnLink>
    </NavBtn>
  </Nav>
  </>
);
};

export default Home;
