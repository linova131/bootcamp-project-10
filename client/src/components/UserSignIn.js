import React, {Component} from 'react';
import Errors from './Errors';

export default class UserSignIn extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  //TODO figure out how to only sometimes show the Errors

  render() {
    const {
      errors,
    } = this.state;

    return (
       <div className="form--centered">
      <h2>Sign In</h2>
      <Errors errors={errors}/>
      {/* TODO Not sure if there need to be validation errors heree */}
      <form onSubmit={this.submit}>
        <label for="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" onChange={this.change} />
        <label for="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" onChange={this.change} />
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" onChange={this.change} />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" onChange={this.change}/>
        <button class="button" type="submit">Sign In</button><button class="button button-secondary" onClick={this.cancel}>Cancel</button>
      </form>
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
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress,password)
      .then(user => {
        if(user === null) {
          this.setState(()=> {
            return {errors: ['Sign in was unsuccessful']};
          })
        } else {
          this.props.history.push('/authenticated');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }
}