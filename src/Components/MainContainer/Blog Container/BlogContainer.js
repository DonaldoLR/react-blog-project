import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost.js/BlogPost';
import Filter from './Filter/Filter';
const BlogContainer = () => {
  const [blogList, setBlogList] = useState(null);
  const BASE_URL = `https://don-project-blog-backend.herokuapp.com`;
  useEffect(() => {
    fetch(`${BASE_URL}/blogs`)
      .then((r) => r.json())
      .then(setBlogList);
  }, []);
  let renderBlogElements;
  if (blogList !== null) {
    renderBlogElements = blogList.map((blog) => {
      return <BlogPost key={blog.id} blog={blog} />;
    });
  }
  return (
    <div>
      <Filter />
      {blogList !== null && renderBlogElements}
    </div>
  );
};

export default BlogContainer;
