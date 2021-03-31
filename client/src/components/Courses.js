import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Courses(props) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios('http://localhost:5000/api/courses')
      .then(response => setCourses(response.data))
      .catch((error) => {
        console.log('Something went wrong with the courses fetch')
        if(error.response.status === 500) {
          props.push.history('/error');
        }
      })
  }, [props])

  let titles = [];
  
  titles = courses.map(course => 
      <Link className="course--module course--link" to={`/courses/${course.id}`}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    );

  return (
    <div className="wrap main--grid">
      {titles}
      <Link className="course--module course--add--module" to="/courses/create">
        <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Course
        </span>
      </Link>

    </div>
  )

}

export default Courses;