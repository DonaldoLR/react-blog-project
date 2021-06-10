import React from 'react';

const BlogPost = ({ blog }) => {
  const { id, image, title, content } = blog;
  return (
    <div className='card'>
      <img src={image} className='card-img-top' alt='...'></img>
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{content}</p>
        <a href='#' className='btn btn-outline-primary'>
          Edit Post
        </a>
      </div>
    </div>
  );
};

export default BlogPost;
