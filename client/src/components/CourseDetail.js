import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

//Renders the CourseDetail page
function CourseDetail(props) {
  //Set state using hooks
  const [course, setCourse] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [materials, setMaterials] = useState('')
  const [author, setAuthor] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [time, setTime] = useState('')

  //Set variables
  const {context} = props;
  let authUserEmail = '';
  const params = useParams();
  const id = params.id;
  if (context.authenticatedUser) {
    authUserEmail = context.authenticatedUser.emailAddress
  }

  //Helper Functions

  //handleDelete accesses the helper functions in Data.js to make a call to the
  //API to delete a course. The user is then redirected to the home page
  function handleDelete(e) {
    e.preventDefault();
    const {context} = props;
    context.data.deleteCourse(id, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
      .then(() => props.history.push('/'))
      .catch(err => {
        console.log(err);
        props.history.push('/error');
      })
  }

  //useEffect will run when the component is rendered. There is an axios call to
  //the API, and then the response data is added to the component state using
  //useState hooks
  useEffect(() => {
    axios(`http://localhost:5000/api/courses/${id}`)
    .then((response) => {
      setCourse(response.data)
      setTitle(response.data.title)
      setAuthor(`${response.data.courseOwner.firstName} ${response.data.courseOwner.lastName}`)
      setAuthorEmail(response.data.courseOwner.emailAddress)
      setDescription(response.data.description)
      setTime(response.data.estimatedTime)
      setMaterials((response.data.materialsNeeded))
    })
    .catch((error) => {
      console.log('Something went wrong with the courses fetch')
      if(error.response.status === 404) {
        props.history.push('/notfound');
      } else if(error.response.status === 500) {
        props.history.push('/error');
      }
    })
  }, [id, props.history]);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
            {authUserEmail === authorEmail ?
            <React.Fragment>
              <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
              <button className="button" onClick={handleDelete}>Delete Course</button>
              <Link className="button button-secondary" to="/">Return to List</Link>
            </React.Fragment>
            :
            <React.Fragment>
              <Link className="button button-secondary" to="/">Return to List</Link>
            </React.Fragment>
            }
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{title}</h4>
              <p>By {author}</p>
              <ReactMarkdown children={description} />
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{time}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown children={materials} />
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  )

}

export default CourseDetail;