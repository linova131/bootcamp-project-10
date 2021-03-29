import React from 'react';

function Authenticated ({context}) {
  const authUser = context.authenticatedUser;

  return(
    <div>
      <h1>{authUser.firstName} is authenticated!</h1>
    </div>
  )
}

export default Authenticated;