import React from 'react';
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../app/hook";
import {showModalAddTransaction} from "../../store/transactions";

const NavBar = () => {
  const dispatch = useAppDispatch();

  const onAddTransaction = () => {
    dispatch(showModalAddTransaction());
  };

  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
      <div className="container d-flex justify-content-between" style={{width: '700px'}}>
        <NavLink to='/' className="navbar-brand">Finance Tracker</NavLink>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="categories" className="nav-link">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="add" className="nav-link" onClick={onAddTransaction}>
                Add
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;