import React from 'react';

const categories = [
  { name: 'Safety Tips', count: 15 },
  { name: 'Trip Preparation', count: 12 },
  { name: 'Solo Travel', count: 8 },
  { name: 'Family Travel', count: 10 },
  { name: 'Travel Stories', count: 14 },
];

const BlogCategories = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-secondary mb-4">Categories</h2>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category.name}>
            <a
              href="#"
              className="flex justify-between items-center text-gray-600 hover:text-primary transition-colors"
            >
              <span>{category.name}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                {category.count}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;