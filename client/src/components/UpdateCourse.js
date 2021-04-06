import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import Errors from './Errors';
import axios from 'axios';

function UpdateCourse(props) {

  //Set state using hooks
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [materials, setMaterials] = useState('')
  const [errors, setErrors] = useState([]);
  const [userId, setUserId] = useState(0)

  //Setting variables and refs
  const params = useParams();
  const id = params.id;
  const titleInput = useRef('');
  const descriptionInput = useRef('');
  const timeInput = useRef('');
  const materialsInput = useRef('');

  function handleChange() {
    setTitle(titleInput.current.value);
    setDescription(descriptionInput.current.value);
    setTime(timeInput.current.value);
    setMaterials(materialsInput.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const {context} = props;
    const course = {
      id,
      title,
      description,
      estimatedTime: time,
      materialsNeeded: materials
    };

    context.data.updateCourse(id, course, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
      .then((err) => {
        if (err) {
          setErrors(err)
        } else {
          props.history.push(`/courses/${id}`)
        }
      })
      .catch(err => {
        console.log(err);
        props.history.push('/error');
      })
  }

  function handleCancel(event) {
    event.preventDefault();
    props.history.push('/courses/' + id);
  }

  useEffect(() => {
    axios(`http://localhost:5000/api/courses/${id}`)
    .then((response) => {
      setTitle(response.data.title)
      setDescription(response.data.description)
      if(response.data.estimatedTime) {
        setTime(response.data.estimatedTime)
      } else {
        setTime('')
      }
      if(response.data.materialsNeeded) {
        setMaterials(response.data.materialsNeeded)
      } else {
        setMaterials('')
      }
      setUserId(response.data.userId)
    })
    .catch((error) => {
      if(error.response.status === 404) {
        props.history.push('/notfound');
      } else if(error.response.status === 500) {
        props.history.push('/error');
      }
      console.log('Something went wrong with the courses fetch')})
  }, [id, props.history]);

  useEffect(() => {
    const {context} = props;
    if (userId && userId !== context.authenticatedUser.id) {
      props.history.push('/forbidden');
    }
  }, [userId, props])

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <Errors errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" ref={titleInput} onChange={handleChange} value={title} />

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" ref={descriptionInput} onChange={handleChange} value={description}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" ref={timeInput} onChange={handleChange} value={time} />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsInput} onChange={handleChange} value={materials}></textarea>
            </div>
          </div>
          <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>    
    </div>    
  )

}

export default UpdateCourse;