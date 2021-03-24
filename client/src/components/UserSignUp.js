import React from 'react';

function UserSignUp(props) {

  function handleCancel(event) {
    event.preventDefault();
    window.location.href = "/"
  }

  // function submit() {
  //   const {context} = this.props;

  //   const {
  //     firstName,
  //     lastName,
  //     username,
  //     password,
  //   } =
  // }


  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      {/* TODO Not sure if there need to be validation errors heree */}
      <form>
      <label for="name">Name</label>
      <input id="name" name="name" type="text" value="" />
      <label for="emailAddress">Email Address</label>
      <input id="emailAddress" name="emailAddress" type="email" value="" />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" value="" />
      <label for="confirmPassword">Confirm Password</label>
      <input id="confirmPassword" name="confirmPassword" type="password" value="" />
      <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick={handleCancel}>Cancel</button>

      </form>
    </div>
  )

}

export default UserSignUp;