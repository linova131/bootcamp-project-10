import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Errors from './Errors';

export default class UserSignIn extends Component {
  state = {
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
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" onChange={this.change} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={this.change}/>
        <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button>
      </form>
      <p>Don't have a user account? Click here to <Link to="/signin">sign up</Link></p>
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
          if(this.props.location.state) {
            this.props.history.push(this.props.location.state.from);
          } else {
            this.props.history.push('/');
          }
        }
      })
      .catch(err => {
        console.log(err);
        if(err.response.status === 500) {
          this.props.history.push('/error');
        }
      })
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }
}