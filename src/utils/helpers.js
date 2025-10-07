export const formatUserName = (user) => {
  if (!user) return '';
  return `${user.firstName || ''} ${user.lastName || ''}`.trim();
};

export const formatSSN = (ssn) => {
  if (!ssn) return '';
  if (ssn.length < 4) return ssn;
  return `***-**-${ssn.slice(-4)}`;
};

export const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

export const getRoleColor = (role) => {
  const colors = {
    admin: '#e53e3e',
    moderator: '#dd6b20',
    user: '#38a169'
  };
  return colors[role] || '#718096';
};

export const formatAddress = (address) => {
  if (!address) return '';
  const parts = [address.city, address.state].filter(Boolean);
  return parts.join(', ');
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const sortUsers = (users, sortBy, sortOrder) => {
  return [...users].sort((a, b) => {
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
};

export const filterUsersByRole = (users, role) => {
  if (role === 'all') return users;
  return users.filter(user => user.role === role);
};