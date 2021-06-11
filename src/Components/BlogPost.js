import React from 'react';

const BlogPost = ({ blog, setEditingMode, setEditingPost }) => {
  const { id, image, title, content } = blog;
  function handleEditPost() {
    setEditingMode(true);
    setEditingPost(blog);
  }
  return (
    <div className='card'>
      <img src={image} className='card-img-top' alt='...'></img>
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{content}</p>
        <button className='btn btn-outline-primary' onClick={handleEditPost}>
          Edit Post
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
