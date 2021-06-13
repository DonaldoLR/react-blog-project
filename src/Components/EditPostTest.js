import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
const EditPostTest = ({ submitData, deletePost }) => {
  const history = useHistory();
  const params = useParams();

  const [formData, setFormData] = useState({
    image: 'Loading...',
    type: 'Loading...',
    title: 'Loading...',
    content: 'Loading...',
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/blogs/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setFormData(data);
        setImagePreviewUrl(data.image);
      });
  }, []);
  const handleInputChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData(formData, parseInt(params.id, 10));
    history.push('/');
  };

  const handleImagePreview = (e) => {
    if (e.target.value !== '') {
      return setImagePreviewUrl(formData.image);
    }
    setImagePreviewUrl('https://via.placeholder.com/150');
  };

  const handleDelete = () => {
    deletePost(parseInt(params.id, 10));
    history.push('/');
  };

  const goHome = () => {
    history.push('/');
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

export default EditPostTest;
