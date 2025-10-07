export const API_ENDPOINTS = {
  SEARCH_USERS: '/users/search',
  GET_USER_BY_ID: '/users',
  GET_USER_BY_EMAIL: '/users/email',
  LOAD_USERS: '/users/load',
  GET_ROLES: '/users/roles'
};

export const DEFAULT_PAGE_SIZE = 50;
export const MIN_SEARCH_LENGTH = 3;
export const DEBOUNCE_DELAY = 300;

export const SORT_OPTIONS = [
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'age', label: 'Age' },
  { value: 'email', label: 'Email' }
];

export const DEFAULT_ROLES = ['admin', 'moderator', 'user'];