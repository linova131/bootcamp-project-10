import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

//Component wrapper that checks for existence of authUser in context to determine
//if route should be accessible. If there is no current authUser, the user
//is redirected to the /signin page
function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
}

export default PrivateRoute;