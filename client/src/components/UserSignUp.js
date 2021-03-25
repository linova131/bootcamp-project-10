import React, {Component} from 'react';

export default class UserSignUp extends Component {

  submit = () => {
    const { context } = this.props;
  
    const {
      name,
      username,
      password,
    } = this.state; 

    const user = {
      name,
      username,
      password,
    };

    context.data.createUser(user)
      .then(errors => {
        if (errors.length) {
          this.setState({errors});
        } else {
          console.log(`${username} is successfully signed up and authenticated`)
        }
      })
      .catch(err=> {
        console.log(err);
      })
  }

  handleCancel = (event) => {
    event.preventDefault();
    window.location.href = "/"
  }

  submit = () => {
    const {context} = this.props;
  }

  render() {
    return (
      <div className="form--centered">
        <h2>Sign Up</h2>
        {/* TODO Not sure if there need to be validation errors heree */}
        <form onSubmit={this.submit}>
        <label for="name">Name</label>
        <input id="name" name="name" type="text" />
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" />
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password"/>
        <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick={this.handleCancel}>Cancel</button>
  
        </form>
      </div>
    )
  }
    
}
