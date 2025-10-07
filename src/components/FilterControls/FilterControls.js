import React from 'react';
import './FilterControls.css';

const FilterControls = ({ roles, selectedRole, onRoleChange }) => {
  return (
    <div className="filter-controls">
      <h4 className="filter-title">Filter by Role:</h4>
      <div className="filter-buttons">
        <button
          className={`filter-button ${selectedRole === 'all' ? 'active' : ''}`}
          onClick={() => onRoleChange('all')}
        >
          All Roles
        </button>
        {roles.map(role => (
          <button
            key={role}
            className={`filter-button ${selectedRole === role ? 'active' : ''}`}
            onClick={() => onRoleChange(role)}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterControls;