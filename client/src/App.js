import './App.css';
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

//Importing components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';
// import Context from './Context';

//Contextualized components
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);


function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios('http://localhost:5000/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.log('Something went wrong with the courses fetch'))
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        
        <Switch>
          <Route exact path="/" render={() => <Courses courses={courses} />} />
          <Route path="/courses/create" render={() => <CreateCourse />} />
          <Route exact path="/courses/:id/update" render={() => <UpdateCourse />} />
          <Route exact path="/courses/:id" render={() => <CourseDetail courses={courses} />} />
          <Route path="/signin" render={() => <UserSignInWithContext />} />
          <Route path="/signup" render={() => <UserSignUpWithContext />} />
          <Route path="/signout" render={() => <UserSignOut />} />
        </Switch>
      </BrowserRouter>


    </div>
  );
}

export default App;
