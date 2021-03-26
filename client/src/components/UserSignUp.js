import React, {useRef, useState} from 'react';

function UserSignUp(props) {

  //useRef is a hook that allow me to use ref's outside of class component
  //Listing the refs for the form elements
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const emailAddressInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmedPasswordInput = useRef(null);

  //Adding state to the input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [errors, setErrors] = useState([]);

  //Helper functions

  //handleCancel adds functionality to the cancel button
  function handleCancel(event) {
    event.preventDefault();
    window.location.href = "/"
  }

  //handleSubmit adds functinoality to the submit button
  //Should call the createUser function from the Data.js file
  //TODO: figure out how to make it work??
  function handleSubmit(event) {
    event.preventDefault();
    const { context } = props
    console.log('submit fired')
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    }
    console.log(user);
    context.data.testFunction();
    context.data.createUser(user)
      .then(errors => {
        if(errors.length) {
          setErrors(errors);
        } else {
          //sign-in route goes here
          console.log('congrats you created a user!');
        }
      })
      .catch(err=> {
        console.log(err);
        //TODO add redirect to either index or error page
      })
  }

  //handleChange helps track the changes to the input boxes
  function handleChange() {
    setFirstName(firstNameInput.current.value);
    setLastName(lastNameInput.current.value);
    setEmail(emailAddressInput.current.value);
    setPassword(passwordInput.current.value);
    setConfirmedPassword(confirmedPasswordInput.current.value);
  }

   
  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      {/* TODO Not sure if there need to be validation errors heree */}
      <form onSubmit={handleSubmit}>
        <label for="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" ref={firstNameInput} onChange={handleChange} />
        <label for="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" ref={lastNameInput} onChange={handleChange} />
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" ref={emailAddressInput} onChange={handleChange} />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" ref={passwordInput} onChange={handleChange}/>
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" ref={confirmedPasswordInput} onChange={handleChange} />
        <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick={handleCancel}>Cancel</button>
      </form>
    </div>
  )

}

export default UserSignUp;