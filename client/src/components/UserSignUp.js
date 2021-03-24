import React from 'react';

function UserSignUp() {

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>

      <form>
      <label for="name">Name</label>
      <input id="name" name="name" type="text" value="" />
      <label for="emailAddress">Email Address</label>
      <input id="emailAddress" name="emailAddress" type="email" value="" />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" value="" />
      <label for="confirmPassword">Confirm Password</label>
      <input id="confirmPassword" name="confirmPassword" type="password" value="" />
      <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>

      </form>
    </div>
  )

}

export default UserSignUp;