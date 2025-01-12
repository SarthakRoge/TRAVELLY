import React from 'react';

const UserInfo = ({ user }) => {
  if (!user) return null;

  const username = user.email.split('@')[0];
  
  return (
    <span className="hidden lg:block text-gray-700 mr-3">
      {username}
    </span>
  );
};

export default UserInfo;