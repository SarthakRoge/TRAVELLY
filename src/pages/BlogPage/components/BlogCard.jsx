import React from 'react';
import { FaUser, FaCalendar, FaTag } from 'react-icons/fa';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-secondary mb-4">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <FaUser className="mr-2" />
            {post.author}
          </div>
          <div className="flex items-center">
            <FaCalendar className="mr-2" />
            {post.date}
          </div>
          <div className="flex items-center">
            <FaTag className="mr-2" />
            {post.category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;