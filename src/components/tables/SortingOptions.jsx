// SortingOptions.js

import React from 'react';

const SortingOptions = ({ sortingOptions, sortBy, sortOrder, onSortChange }) => {
  return (
    <div className="sorting-options">
      <label>По алфавиту</label>
      <select onChange={(e) => onSortChange(e.target.value)} value={sortBy}>
        {sortingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={() => onSortChange(sortBy)}>
        {`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
      </button>
    </div>
  );
};

export default SortingOptions;
