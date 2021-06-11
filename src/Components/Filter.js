import React from 'react';

const Filter = ({ setFilter }) => {
  function handleFilter(event) {
    setFilter(event.target.innerText);
  }
  return (
    <ul className='nav nav-pills justify-content-center'>
      <li className='nav-item'>
        <a
          className='nav-link'
          aria-current='page'
          href='#'
          onClick={handleFilter}
        >
          Tech
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#' onClick={handleFilter}>
          Food
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#' onClick={handleFilter}>
          Life
        </a>
      </li>
    </ul>
  );
};

export default Filter;
