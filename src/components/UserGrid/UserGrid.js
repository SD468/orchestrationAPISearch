import React from 'react';
import UserCard from '../UserCard/UserCard';
import './UserGrid.css';

const UserGrid = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <div className="no-users">
        <p>No users to display</p>
      </div>
    );
  }

  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserGrid;