import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function CourseDetail(props) {
  const params = useParams();
  const id = params.id;
  let materials = [];
  let author = '';

  const [course, setCourse] = useState([])
  useEffect(() => {
    axios(`http://localhost:5000/api/courses/${id}`)
    .then(response => setCourse(response.data))
    .catch(error => console.log('Something went wrong with the courses fetch'))
  }, [id]);

  if(course.courseOwner) {
    author = course.courseOwner.firstName + ' ' + course.courseOwner.lastName;
    console.log(author)
  }
 

  if(course.materialsNeeded) {
    materials = course.materialsNeeded.split('*');
    materials.shift();
    materials = materials.map(material =>
      <li>{material}</li>
      );
  }

  //TODO, like materialsNeeded, add estimatedTime if statement

  return (
    <div className="wrap">
      <h2>Course Detail</h2>
      <form>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            <p>By {author}</p>
            <p>{course.description}</p>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime}</p>
            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">
              {materials}
            </ul>
          </div>
        </div>
      </form>
    </div>
  )

}

export default CourseDetail;