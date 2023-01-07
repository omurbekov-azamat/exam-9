import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home/Home";
import Categories from "./containers/Categories/Categories";
import ModalForm from "./containers/ModalForm/ModalForm";
import EditCategory from "./containers/EditCategory/EditCategory";
import AddTransaction from "./containers/AddTransaction/AddTransaction";
import Transactions from "./containers/Transactions/Transactions";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route path='/' element={<Transactions/>}>
          <Route path='/add' element={<AddTransaction/>}/>
        </Route>
        <Route path='/categories' element={<Categories/>}>
          <Route path='/categories/add-category/' element={<ModalForm/>}/>
          <Route path='/categories/edit-category/:id' element={<EditCategory/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
