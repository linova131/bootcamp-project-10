import React, {Component} from 'react';
import Data from './Data';
const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticatedUser: null
  };

  constructor() {
    super();
    //Allows us to access the helper class functions from Data.js
    this.data = new Data();
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        user.password = password
        return {
          authenticatedUser: user,
        };
      });
      //Set cookie
      // Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  testFunction = () => {
    console.log('test fired')
  }

  signOut = async () => {
    this.setState({authenticatedUser: null});
  }

  render() {
    const {authenticatedUser} = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        testFunction: this.testFunction,
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;

//Wraps a provided component in Context.Consumer component. Subscribes component to all actions/context changes
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
