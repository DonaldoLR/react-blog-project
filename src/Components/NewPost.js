import React, { useState } from 'react';

const NewPost = ({ submitData }) => {
  const intialState = {
    image: '',
    type: 'Tech',
    title: '',
    content: '',
  };

  const [formData, setFormData] = useState(intialState);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    'https://via.placeholder.com/150'
  );

  const handleInputChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData(formData);
    setFormData(intialState);
  };

  const handleImagePreview = (event) => {
    if (event.target.value !== '') {
      return setImagePreviewUrl(formData.image);
    }
    setImagePreviewUrl('https://via.placeholder.com/150');
  };

  return (
    <form onSubmit={handleSubmit}>
      <img src={imagePreviewUrl} width='80%'></img>
      <div className='mb-3'>
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
      <button type='submit' className='btn btn-outline-primary'>
        Submit
      </button>
    </form>
  );
};

export default NewPost;
