import React from 'react';

function UserSignIn() {

  function handleCancel(event) {
    event.preventDefault();
    window.location.href = "/"
  }


  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form>
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" value="" />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" value="" />
        <button class="button" type="submit">Sign In</button><button class="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
      <p>Don't have a user account? Click here to sign up</p>
    
    </div>
  )

}

export default UserSignIn;