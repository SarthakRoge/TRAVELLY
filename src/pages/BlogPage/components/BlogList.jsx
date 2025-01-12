import React from 'react';
import BlogCard from './BlogCard';

const mockPosts = [
  {
    id: 1,
    title: 'Essential Safety Tips for Solo Travelers',
    excerpt: 'Stay safe while exploring the world alone with these proven safety guidelines...',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    author: 'Sarah Johnson',
    date: '2024-02-15',
    category: 'Safety Tips',
  },
  {
    id: 2,
    title: 'Family Travel Guide: Making Memories Together',
    excerpt: 'Plan the perfect family vacation with tips for traveling with children of all ages...',
    image: 'https://images.unsplash.com/photo-1571210862729-78a52d3779a2',
    author: 'Mike Chen',
    date: '2024-02-10',
    category: 'Family Travel',
  },
];

const BlogList = () => {
  return (
    <div className="space-y-8">
      {mockPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;