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
  function handleCancel(event) {
    event.preventDefault();
    props.history.push('/');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const {context} = props;
    const course = {
      title,
      description,
      estimatedTime: time,
      materialsNeeded: materials,
      userId: context.authenticatedUser.id
    }

    context.data.createCourse(course, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
      .then((err) => {
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
              <label for="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" ref={titleInput} onChange={handleChange} type="text" />
              <label for="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" ref={descriptionInput} onChange={handleChange}></textarea>
            </div>
            <div>
              <label for="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" ref={timeInput} onChange={handleChange} type="text" />

              <label for="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsInput} onChange={handleChange}></textarea>
            </div>
          </div>
          <button class="button" type="submit">Create Course</button><button class="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>    
    </div>    
  )

}

export default CreateCourse;