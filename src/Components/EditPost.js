import React, { useState } from 'react';

const EditPost = ({ blog, submitData, deletePost, setEditingMode }) => {
  const { id, image, type, title, content } = blog;

  const [formData, setFormData] = useState({
    image: image,
    type: type,
    title: title,
    content: content,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(image);
  const handleInputChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [key]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    submitData(formData, id);
  };
  const handleImagePreview = (e) => {
    if (e.target.value !== '') {
      return setImagePreviewUrl(formData.image);
    }
    setImagePreviewUrl('https://via.placeholder.com/150');
  };
  const handleDelete = () => {
    deletePost(id);
  };
  const goHome = () => {
    setEditingMode(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className='row'>
        <img
          src={imagePreviewUrl}
          width='100%'
          alt='Preview'
          className='col-lg'
        ></img>
        <div className='col-lg'>
          <div className='mb-3 col-lg'>
            <label className='form-label'>Image URL</label>
            <input
              type='text'
              className='form-control'
              id='ImageUrl'
              aria-describedby='emailHelp'
              name='image'
              value={formData.image}
              onChange={handleInputChange}
              onBlur={handleImagePreview}
            ></input>
          </div>
          <div>
            <label htmlFor='Type' className='form-label'>
              Category
            </label>
            <select
              className='form-select'
              id='Type'
              aria-label='Default select example'
              name='type'
              onChange={handleInputChange}
            >
              <option value='Tech' defaultValue>
                Tech
              </option>
              <option value='Food'>Food</option>
              <option value='Life'>Life</option>
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor='Title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              id='Title'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='Content' className='form-label'>
              Content
            </label>
            <textarea
              className='form-control'
              id='Content'
              rows='3'
              name='content'
              value={formData.content}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn btn-outline-primary'>
              Submit
            </button>
          </div>
        </div>
      </form>

      <div className='d-grid my-5'>
        <h2 className='text-danger text-center'>Danger Zone</h2>
        <button
          type='button'
          className='btn btn-outline-danger'
          onClick={handleDelete}
        >
          Delete Post
        </button>
      </div>
      <div className='d-grid my-5'>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={goHome}
        >
          Go Back Home
        </button>
      </div>
    </>
  );
};

export default EditPost;