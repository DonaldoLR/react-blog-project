import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import Filter from './Filter';
import NewPost from './NewPost';
import EditPost from './EditPost';
import { Switch, Route } from 'react-router-dom';
const BlogContainer = () => {
  const [blogList, setBlogList] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [editingMode, setEditingMode] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const BASE_URL = `http://localhost:3000`;

  useEffect(() => {
    fetch(`${BASE_URL}/blogs`)
      .then((r) => r.json())
      .then(setBlogList);
  }, []);
  function renderBlogElements() {
    let filteredBlogList = [...blogList];
    if (filterType !== null) {
      filteredBlogList = filteredBlogList.filter((blog) => {
        if (filterType === 'All') {
          return true;
        } else {
          return blog.type === filterType;
        }
      });
    }
    return filteredBlogList.map((blog) => (
      <BlogPost
        key={blog.id}
        blog={blog}
        setEditingMode={setEditingMode}
        setEditingPost={setEditingPost}
      />
    ));
  }
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
      <Switch>
        <Route exact path='/'>
          <h1 className='text-center'>Latest Posts</h1>
          <Filter setFilter={setFilterType} />
          {blogList && renderBlogElements()}
        </Route>
        <Route exact path='/newPost'>
          <NewPost submitData={addNewPost} />
        </Route>
        <Route exact path='/editPost/:id'>
          <EditPost
            blog={editingPost}
            submitData={editPost}
            deletePost={deletePost}
          />
        </Route>

        {/* {editingMode ? (
        <EditPost
          blog={editingPost}
          submitData={editPost}
          deletePost={deletePost}
        />
      ) : (
        blogList && renderBlogElements()
      )} */}
      </Switch>
    </div>
  );
};

export default BlogContainer;
