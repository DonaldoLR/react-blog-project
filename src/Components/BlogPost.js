import React from 'react';
import { NavLink } from 'react-router-dom';
const BlogPost = ({ blog, setEditingMode, setEditingPost }) => {
  const { id, image, title, content } = blog;
  // function handleEditPost() {
  //   setEditingMode(true);
  //   setEditingPost(blog);
  // }
  return (
    <div className='col-sm-12 col-md-6 col-lg-4 align-content-stretch rounded'>
      <div className='card text-white bg-dark h-100'>
        <img
          src={image}
          className='rounded img-fluid card-img-top'
          alt={title}
        ></img>
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{content}</p>
        </div>
        <div className='card-footer'>
          {/* <button className='btn btn-outline-primary' onClick={handleEditPost}>
            Edit Post
          </button> */}
          <NavLink className='btn btn-outline-primary' to={`editPost/${id}`}>
            Edit Post
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
