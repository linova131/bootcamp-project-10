import './App.css';
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import axios from 'axios';

//Importing components
import Header from './components/Header';
import PrivateRoute from './PrivateRoute';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import withContext from './Context';

//Contextualized components
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);


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
        <HeaderWithContext />
        
        <Switch>
          <Route exact path="/" render={() => <Courses courses={courses} />} />
          <Route path="/courses/create" component={CreateCourse} />
          <Route exact path="/courses/:id/update" component={UpdateCourse} />
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <PrivateRoute path="/authenticated" component={AuthWithContext} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>


    </div>
  );
}

export default App;
