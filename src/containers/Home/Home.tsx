import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import {Outlet} from "react-router-dom";

const Home = () => {
  return (
    <>
      <NavBar/>
      <div className='container'>
        <p>Hello World!</p>
        <Outlet/>
      </div>
    </>
  );
};

export default Home;