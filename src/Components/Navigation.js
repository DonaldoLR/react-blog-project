import React from 'react';

const Navigation = () => {
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          Blog
        </a>
        <ul className='nav nav-pills justify-content-end'>
          <li className='nav-item '>
            <a className='btn btn-outline-success' aria-current='page' href='#'>
              New Post
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
