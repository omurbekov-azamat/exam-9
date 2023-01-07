import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home/Home";
import Categories from "./containers/Categories/Categories";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route path='/categories' element={<Categories/>}/>
      </Route>
    </Routes>
  );
}

export default App;
