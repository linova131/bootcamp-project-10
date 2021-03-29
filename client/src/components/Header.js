import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.PureComponent {
  

  render() {
    const {context} = this.props;
    const authUser = context.authenticatedUser;

    return (
      <header>
      <div className="wrap header--flex">
          <h1 className="header--logo"><a href="/">Courses</a></h1>
          <nav>
            {authUser ?
              <React.Fragment>
                <span>Welcome, {authUser.firstName}!</span>
                <Link to="/">Sign Out</Link>
              </React.Fragment>
              :
              <React.Fragment>
                <Link to="/signup">Sign Up</Link>
                <Link to="/signin">Sign In</Link>
              </React.Fragment>
            }

          </nav>
      </div>
      </header>
    )
  }

}