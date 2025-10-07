import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import UserGrid from './components/UserGrid/UserGrid';
import FilterControls from './components/FilterControls/FilterControls';
import SortControls from './components/SortControls/SortControls';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { searchUsers, loadUsersFromApi, getAvailableRoles } from './services/userService';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [sortBy, setSortBy] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roles, setRoles] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length >= 3) {
      handleSearch();
    } else if (debouncedSearchTerm.length === 0) {
      setUsers([]);
      setFilteredUsers([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, selectedRole, sortBy, sortOrder]);

  const loadRoles = async () => {
    try {
      const rolesData = await getAvailableRoles();
      setRoles(rolesData);
    } catch (err) {
      console.error('Error loading roles:', err);
    }
  };

  const handleLoadData = async () => {
    setLoading(true);
    setError('');
    try {
      await loadUsersFromApi();
      setIsDataLoaded(true);
      if (searchTerm && searchTerm.length >= 3) {
        await handleSearch();
      }
    } catch (err) {
      setError('Failed to load users from external API. Please try again.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 3) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await searchUsers(debouncedSearchTerm);
      setUsers(response.content || []);
    } catch (err) {
      setError('Failed to search users. Please try again.');
      console.error('Error searching users:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = [...users];

    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'age') {
        aValue = parseInt(aValue) || 0;
        bValue = parseInt(bValue) || 0;
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
  };

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">User Management System</h1>
        <p className="app-subtitle">Search and manage users with advanced filtering</p>
      </header>

      <main className="main-content">
        <div className="search-section">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by first name, last name, or SSN (min 3 characters)"
          />
          
          {!isDataLoaded && (
            <div className="load-data-section">
              <button 
                className="load-data-button"
                onClick={handleLoadData}
                disabled={loading}
              >
                {loading ? 'Loading Users...' : 'Load Users from API'}
              </button>
              <p className="load-data-info">
                Click to load user data from external API before searching
              </p>
            </div>
          )}
        </div>

        {error && <ErrorMessage message={error} />}

        {loading && <LoadingSpinner />}

        {users.length > 0 && (
          <div className="controls-section">
            <FilterControls
              roles={roles}
              selectedRole={selectedRole}
              onRoleChange={handleRoleFilter}
            />
            <SortControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
          </div>
        )}

        {filteredUsers.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <h3>Search Results ({filteredUsers.length} users found)</h3>
            </div>
            <UserGrid users={filteredUsers} />
          </div>
        )}

        {searchTerm.length >= 3 && !loading && filteredUsers.length === 0 && users.length === 0 && (
          <div className="no-results">
            <p>No users found matching your search criteria.</p>
          </div>
        )}

        {searchTerm.length > 0 && searchTerm.length < 3 && (
          <div className="search-hint">
            <p>Please enter at least 3 characters to search.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;