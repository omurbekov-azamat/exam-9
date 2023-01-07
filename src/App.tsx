import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home/Home";
import Categories from "./containers/Categories/Categories";
import ModalAddCategory from "./components/Modal/ModalAddCategory";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route path='/categories' element={<Categories/>}>
          <Route path='/categories/add-category/' element={<ModalAddCategory/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
