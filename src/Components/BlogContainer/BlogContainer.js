import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost/BlogPost';
import Filter from './Filter/Filter';
import NewPost from './NewPost/NewPost';
import EditPost from './EditPost/EditPost';
import { Switch, Route } from 'react-router-dom';
const BlogContainer = () => {
  const [blogList, setBlogList] = useState(null);
  const [filterType, setFilterType] = useState(null);

  const BASE_URL = `https://don-project-blog-backend.herokuapp.com/blogs`;
  /* Fetch Data */

  useEffect(() => {
    fetch(`https://don-project-blog-backend.herokuapp.com/blogs`)
      .then((r) => r.json())
      .then(setBlogList);
  }, []);

  /* Render Components */

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
      <BlogPost key={blog.id} blog={blog} />
    ));
  }
  function addNewPost(formData) {
    fetch(`${BASE_URL}`, {
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
    fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        const updatedBlogList = blogList.map((blog) => {
          if (blog.id === data.id) return data;
          return blog;
        });
        setBlogList(updatedBlogList);
      });
  }
  function deletePost(id) {
    fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then(() => {
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
          {/*If blogList is not null render blog components */}
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
          <EditPost deletePost={deletePost} submitData={editPost} />
        </Route>
      </Switch>
    </div>
  );
};

export default BlogContainer;
