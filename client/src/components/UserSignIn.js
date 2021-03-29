import React, {useState, useRef} from 'react';

function UserSignIn(props) {


  //useRef is a hook that allow me to use ref's outside of class component
  //Listing the refs for the form elements
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const emailAddressInput = useRef(null);
  const passwordInput = useRef(null);

  //Adding state to the input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    console.log('submit fired')
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
    context.actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          setErrors('Sorry no such user exists')
          console.log(errors);
        } else {
          console.log('The sign in worked!')
          //TODO: add a redirect here
          // this.props.history.push(from);
        }
      })
      .catch( err => {
        console.log(err);
        // this.props.history.push('./error');
      })
  }

  //handleChange helps track the changes to the input boxes
  function handleChange() {
    setFirstName(firstNameInput.current.value);
    setLastName(lastNameInput.current.value);
    setEmail(emailAddressInput.current.value);
    setPassword(passwordInput.current.value);
  }

  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit} errors={errors}>
        <label for="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" ref={firstNameInput} onChange={handleChange} />
        <label for="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" ref={lastNameInput} onChange={handleChange} />
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" ref={emailAddressInput} onChange={handleChange} />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" ref={passwordInput} onChange={handleChange}/>
        <button class="button" type="submit">Sign In</button><button class="button button-secondary" onclick={handleCancel}>Cancel</button>
      </form>
      <p>Don't have a user account? Click here to sign up</p>
    
    </div>
  )

}

export default UserSignIn;