import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="search-input"
            autoComplete="off"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <button
            type="submit"
            className="search-button"
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;