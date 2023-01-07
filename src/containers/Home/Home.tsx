import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import {Outlet} from "react-router-dom";

const Home = () => {

  return (
    <>
      <NavBar/>
      <div className='container' style={{width: '700px'}}>
        p123
        <Outlet/>
      </div>
    </>
  );
};

export default Home;