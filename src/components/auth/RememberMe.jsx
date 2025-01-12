import React from 'react';

const RememberMe = ({ checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
      />
      <span className="text-sm text-gray-950">Remember me</span>
    </label>
  );
};

export default RememberMe;