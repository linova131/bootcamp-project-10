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
                <span>Welcome, {authUser.name}!</span>
                <Link to="/">Sign Out</Link>
              </React.Fragment>
              :
              <ul className="header--signedout">
              <li><a href="/signup">Sign Up</a></li>
                  <li><a href="/signin">Sign In</a></li>
              </ul>
            }

          </nav>
      </div>
      </header>
    )
  }

}