import React, { useState } from 'react';

const Filter = ({ setFilter }) => {
  const [filterTypeSelected, setFilterTypeSelected] = useState('All');
  function handleFilter(event) {
    setFilterTypeSelected(event.target.innerText);
    setFilter(event.target.innerText);
  }
  const renderListItems = () => {
    const filterTypesList = ['All', 'Tech', 'Food', 'Life'];
    return filterTypesList.map((type, idx) => {
      return (
        <li key={idx} className='nav-item'>
          <button
            className={
              filterTypeSelected === type ? `nav-link active` : 'nav-link'
            }
            aria-current='page'
            onClick={handleFilter}
          >
            {type}
          </button>
        </li>
      );
    });
  };
  return (
    <ul className='nav nav-pills justify-content-center'>
      {renderListItems()}
    </ul>
  );
};

export default Filter;
