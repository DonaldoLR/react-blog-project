import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import Filter from './Filter';
import NewPost from './NewPost';
import EditPost from './EditPost';
import { Switch, Route } from 'react-router-dom';
import EditPostTest from './EditPostTest';
const BlogContainer = () => {
  const [blogList, setBlogList] = useState(null);
  const [filterType, setFilterType] = useState(null);
  // const [editingMode, setEditingMode] = useState(false);
  // const [editingPost, setEditingPost] = useState(null);

  const BASE_URL = `http://localhost:3000`;

  useEffect(() => {
    fetch(`http://localhost:3000/blogs`)
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
        // setEditingMode={setEditingMode}
        // setEditingPost={setEditingPost}
      />
    ));
  }
  // const fetchBlogs = async () => {
  //   const data = await fetch(`http://localhost:3000/blogs`);
  //   const items = await data.json();
  //   setBlogList(items);
  // };
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
        // fetchBlogs();
        // console.log(data);

        const updatedBlogList = blogList.map((blog) => {
          if (blog.id === data.id) return data;
          return blog;
        });
        // console.log(updatedBlogList);
        setBlogList(updatedBlogList);
        // setEditingMode(false);
      });
  }
  function deletePost(id) {
    fetch(`${BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then(() => {
        // fetchBlogs();
        const updatedBlogList = blogList.filter((blog) => {
          return blog.id !== id;
        });

        setBlogList(updatedBlogList);
      });
  }
  return (
    <div className='container mt-5'>
      <Switch>
        <Route exact path='/'>
          {/* {editingMode ? (
            <EditPost
              blog={editingPost}
              submitData={editPost}
              deletePost={deletePost}
              setEditingMode={setEditingMode}
            />
          ) : ( */}
          {blogList && (
            <>
              <h1 className='text-center'>Latest Posts</h1>
              <div className='row text-center g-4'>
                <Filter setFilter={setFilterType} />
                {renderBlogElements()}
              </div>
            </>
          )}
        </Route>
        <Route path='/newPost'>
          <NewPost submitData={addNewPost} />
        </Route>
        <Route path='/editPost/:id'>
          <EditPostTest deletePost={deletePost} submitData={editPost} />
        </Route>
      </Switch>
    </div>
  );
};

export default BlogContainer;
