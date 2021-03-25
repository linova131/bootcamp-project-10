import React, { Component } from 'react';

export default class UserSignUp extends Component {
  state = {
    name: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
       <div className="form--centered">
      <h2>Sign Up</h2>
      {/* TODO Not sure if there need to be validation errors heree */}
      <form onSubmit={this.submit}>
        <label for="name">Name</label>
        <input id="name" name="name" type="text" onChange={this.change} />
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" onChange={this.change} />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" onChange={this.change}/>
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" onChange={this.change} />
        <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick={this.cancel}>Cancel</button>
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
    const { name, emailAddress, password } = this.state;

    //New User Payload
    const user = {
      name,
      emailAddress,
      password
    };
    console.log('submit fired')

    // context.data.createUser(user)
    //   .then(errors => {
    //     if (errors.length) {
    //       this.setState({ errors });
    //     } else {
    //       context.actions.signIn(emailAddress, password)
    //         .then(() => {
    //           this.props.history.push('/authenticated');
    //         });
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.props.history.push('/error');
    //   })
  }

  cancel = () => {
    this.props.history.push('/');
  }
}

