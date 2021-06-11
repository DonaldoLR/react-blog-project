import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import Filter from './Filter';
import NewPost from './NewPost';
import EditPost from './EditPost';
const BlogContainer = () => {
  const [blogList, setBlogList] = useState(null);
  // const [filterType, setFilterType] = useState(null);
  const [editingMode, setEditingMode] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const BASE_URL = `http://localhost:3000`;

  useEffect(() => {
    fetch(`${BASE_URL}/blogs`)
      .then((r) => r.json())
      .then(setBlogList);
  }, []);
  function addNewPost(formData) {
    fetch(`${BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => setBlogList([...blogList, data]));
  }

  function renderBlogElements() {
    return blogList.map((blog) => (
      <BlogPost
        key={blog.id}
        blog={blog}
        setEditingMode={setEditingMode}
        setEditingPost={setEditingPost}
      />
    ));
  }
  function editPost(formData, id) {
    fetch(`${BASE_URL}/blogs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        const updatedBlogList = blogList.map((blog) => {
          if (blog.id === id) return data;
          return blog;
        });

        setBlogList(updatedBlogList);
        setEditingMode(false);
      });
  }
  function deletePost(id) {
    fetch(`${BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then(() => {
        const updatedBlogList = blogList.filter((blog) => {
          return blog.id !== id;
        });
        setBlogList(updatedBlogList);
        setEditingMode(false);
      });
  }
  return (
    <div>
      <h1 className='text-center'>Latest Posts</h1>
      <NewPost submitData={addNewPost} />
      {/* <Filter setFilter={setFilterType} /> */}

      {editingMode ? (
        <EditPost
          blog={editingPost}
          submitData={editPost}
          deletePost={deletePost}
        />
      ) : (
        blogList && renderBlogElements()
      )}
    </div>
  );
};

export default BlogContainer;
