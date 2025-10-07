import React, { useState } from 'react';
import './UserCard.css';

const UserCard = ({ user }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: '#e53e3e',
      moderator: '#dd6b20',
      user: '#38a169'
    };
    return colors[role] || '#718096';
  };

  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-avatar">
          {user.image && !imageError ? (
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              onError={handleImageError}
            />
          ) : (
            <div className="avatar-initials">
              {getInitials(user.firstName, user.lastName)}
            </div>
          )}
        </div>
        <div className="user-basic-info">
          <h3 className="user-name">
            {user.firstName} {user.lastName}
          </h3>
          <p className="user-email">{user.email}</p>
          <div 
            className="user-role"
            style={{ backgroundColor: getRoleColor(user.role) }}
          >
            {user.role}
          </div>
        </div>
      </div>

      <div className="user-card-body">
        <div className="user-detail">
          <span className="detail-label">Age:</span>
          <span className="detail-value">{user.age}</span>
        </div>
        <div className="user-detail">
          <span className="detail-label">Gender:</span>
          <span className="detail-value">{user.gender}</span>
        </div>
        <div className="user-detail">
          <span className="detail-label">Phone:</span>
          <span className="detail-value">{user.phone}</span>
        </div>
        {user.company?.name && (
          <div className="user-detail">
            <span className="detail-label">Company:</span>
            <span className="detail-value">{user.company.name}</span>
          </div>
        )}
        {user.address?.city && (
          <div className="user-detail">
            <span className="detail-label">Location:</span>
            <span className="detail-value">
              {user.address.city}, {user.address.state}
            </span>
          </div>
        )}
        {user.ssn && (
          <div className="user-detail">
            <span className="detail-label">SSN:</span>
            <span className="detail-value">***-**-{user.ssn.slice(-4)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;