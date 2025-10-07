import apiClient from './apiClient';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

export const searchUsers = async (searchTerm, page = 0, size = 50) => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/users/search`, {
      params: {
        query: searchTerm,
        page,
        size
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user by id:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/users/email/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

export const loadUsersFromApi = async () => {
  try {
    const response = await apiClient.post(`${API_BASE_URL}/users/load`);
    return response.data;
  } catch (error) {
    console.error('Error loading users from API:', error);
    throw error;
  }
};

export const getAvailableRoles = async () => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/users/roles`);
    return response.data;
  } catch (error) {
    console.error('Error getting available roles:', error);
    return ['admin', 'moderator', 'user'];
  }
};

export const getUsersByRole = async (role, page = 0, size = 10) => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/users/role/${role}`, {
      params: { page, size }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting users by role:', error);
    throw error;
  }
};