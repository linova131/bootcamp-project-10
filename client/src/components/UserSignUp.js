import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Errors from './Errors';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: null,
    errors: [],
  }

  render() {
    const {
      errors,
    } = this.state;

    return (
       <div className="form--centered">
      <h2>Sign Up</h2>
      <Errors errors={errors}/>
      <form onSubmit={this.submit}>
        <label for="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" onChange={this.change} />
        <label for="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" onChange={this.change} />
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" onChange={this.change} />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" onChange={this.change}/>
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" onChange={this.change} />
        <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onClick={this.cancel}>Cancel</button>
      </form>
      <p>Already have a user account? Click here to <Link to="/signin">sign in</Link></p>
    </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = (e) => {
    e.preventDefault();
    const { context } = this.props;
    const { firstName, lastName, emailAddress, password } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };
    context.data.createUser(user)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              console.log('This user has been created and is signed in!')
              this.props.history.push('/');
            });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }
}

