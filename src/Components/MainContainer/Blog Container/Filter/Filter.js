import React from 'react';

const Filter = () => {
  return (
    <ul className='nav nav-pills justify-content-center'>
      <li className='nav-item'>
        <a className='nav-link active' aria-current='page' href='#'>
          Tech
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Food
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Life
        </a>
      </li>
    </ul>
  );
};

export default Filter;
