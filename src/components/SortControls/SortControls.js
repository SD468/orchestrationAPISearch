import React from 'react';
import './SortControls.css';

const SortControls = ({ sortBy, sortOrder, onSort }) => {
  const sortOptions = [
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' },
    { value: 'age', label: 'Age' },
    { value: 'email', label: 'Email' }
  ];

  const handleSortChange = (field) => {
    if (sortBy === field) {
      onSort(field, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(field, 'asc');
    }
  };

  return (
    <div className="sort-controls">
      <h4 className="sort-title">Sort by:</h4>
      <div className="sort-buttons">
        {sortOptions.map(option => (
          <button
            key={option.value}
            className={`sort-button ${sortBy === option.value ? 'active' : ''}`}
            onClick={() => handleSortChange(option.value)}
          >
            {option.label}
            {sortBy === option.value && (
              <span className={`sort-arrow ${sortOrder}`}>
                {sortOrder === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortControls;