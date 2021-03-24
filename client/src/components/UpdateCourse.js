import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function UpdateCourse() {

  const [course, setCourse] = useState([])
  const params = useParams();
  const id = params.id;
  let materials = [];
  let author = '';
  let time = '';

  function handleCancel(event) {
    event.preventDefault();
    window.location.href = "/"
  }

  useEffect(() => {
    axios(`http://localhost:5000/api/courses/${id}`)
    .then(response => setCourse(response.data))
    .catch(error => console.log('Something went wrong with the courses fetch'))
  }, [id]);

  if(course.courseOwner) {
    author = course.courseOwner.firstName + ' ' + course.courseOwner.lastName;
  }
 
  if(course.materialsNeeded) {
    materials = course.materialsNeeded.split('*');
    materials.shift();
    materials = materials.map(material =>
      <li>{material}</li>
      );
  }

  if(course.estimatedTime) {
    time = course.estimatedTime;
  }


  console.log(course.description)

  //TODO figure out how to populate textarea in the return statement

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <form>
        <div className="main--flex">
            <div>
              <label for="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value={course.title} />

              <label for="courseAuthor">Course Author</label>
              <input id="courseAuthor" name="courseAuthor" type="text" value={author} />

              <label for="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" value={course.description}></textarea>
            </div>
            <div>
              <label for="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value={time} />

              <label for="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded}></textarea>
            </div>
          </div>
          <button class="button" type="submit">Update Course</button><button class="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>    
    </div>    
  )

}

export default UpdateCourse;