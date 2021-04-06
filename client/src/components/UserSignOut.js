import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';

function UserSignOut({context}) {
  useEffect(() => context.actions.signOut())

  return (
    <Redirect to="/" />
  )

}

export default UserSignOut;