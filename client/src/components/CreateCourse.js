import React, {useState, useRef} from 'react';
import Errors from './Errors';

//Renders the Create Course page
function CreateCourse(props) {
  
  //Set state using hooks
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [materials, setMaterials] = useState('')
  const [errors, setErrors] = useState([]);

  //Setting variables and refs
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);
  const timeInput = useRef(null);
  const materialsInput = useRef(null);

  //Helper Functions
  
  //handleCancel adds functionality to cancel button
  function handleCancel(event) {
    event.preventDefault();
    props.history.push('/');
  }

  //handleSubmit adds functionality to submit button, triggers API call
  function handleSubmit(e) {
    e.preventDefault();
    const {context} = props;
    
    //Generates the eventual req.body from the input elements
    const course = {
      title,
      description,
      estimatedTime: time,
      materialsNeeded: materials,
      userId: context.authenticatedUser.id
    }

    //API call via data.js helper functions
    context.data.createCourse(course, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
      .then((err) => {
        console.log(err)
        if (err.length) {
          setErrors(err)
        } else {
          props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
        props.history.push('/error');
      })
  }

  //handleChange listens for changes to all the input fields and updates the state variables each time
  function handleChange() {
    setTitle(titleInput.current.value);
    setDescription(descriptionInput.current.value);
    setTime(timeInput.current.value);
    setMaterials(materialsInput.current.value);
  }


  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <Errors errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" ref={titleInput} onChange={handleChange} type="text" />
              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" ref={descriptionInput} onChange={handleChange}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" ref={timeInput} onChange={handleChange} type="text" />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsInput} onChange={handleChange}></textarea>
            </div>
          </div>
          <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>    
    </div>    
  )

}

export default CreateCourse;