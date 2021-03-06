import React from 'react';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
  return (
    <nav className='navbar navbar-dark bg-dark p-3'>
      <div className='container-fluid'>
        <NavLink exact to='/' className='navbar-brand'>
          Blog
        </NavLink>
        <ul className='nav nav-pills justify-content-end'>
          <li className='nav-item '>
            <NavLink to='/newPost' className='btn btn-outline-success'>
              New Post
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
