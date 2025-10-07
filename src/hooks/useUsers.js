import { useState, useCallback } from 'react';
import { searchUsers, loadUsersFromApi, getAvailableRoles } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roles, setRoles] = useState([]);

  const searchUsersHandler = useCallback(async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) {
      setUsers([]);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await searchUsers(searchTerm);
      setUsers(response.content || []);
    } catch (err) {
      setError('Failed to search users. Please try again.');
      console.error('Error searching users:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      await loadUsersFromApi();
    } catch (err) {
      setError('Failed to load users from external API.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRoles = useCallback(async () => {
    try {
      const rolesData = await getAvailableRoles();
      setRoles(rolesData);
    } catch (err) {
      console.error('Error loading roles:', err);
      setRoles(['admin', 'moderator', 'user']);
    }
  }, []);

  return {
    users,
    setUsers,
    loading,
    error,
    roles,
    searchUsersHandler,
    loadUsers,
    loadRoles
  };
};