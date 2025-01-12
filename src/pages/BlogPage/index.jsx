import React from 'react';
import BlogList from './components/BlogList';
import BlogCategories from './components/BlogCategories';

const BlogPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-secondary mb-8">Travel Blog</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogList />
          </div>
          <div className="lg:col-span-1">
            <BlogCategories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;