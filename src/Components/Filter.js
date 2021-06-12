import React from 'react';

const Filter = ({ setFilter }) => {
  function handleFilter(event) {
    setFilter(event.target.innerText);
  }
  return (
    <ul className='nav nav-pills justify-content-center'>
      <li className='nav-item'>
        <button className='nav-link' aria-current='page' onClick={handleFilter}>
          All
        </button>
      </li>
      <li className='nav-item'>
        <button className='nav-link' aria-current='page' onClick={handleFilter}>
          Tech
        </button>
      </li>
      <li className='nav-item'>
        <button className='nav-link' onClick={handleFilter}>
          Food
        </button>
      </li>
      <li className='nav-item'>
        <button className='nav-link' onClick={handleFilter}>
          Life
        </button>
      </li>
    </ul>
  );
};

export default Filter;
