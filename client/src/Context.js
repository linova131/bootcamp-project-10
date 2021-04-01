import React, {Component} from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

//Creates context for entire app
const Context = React.createContext();


export class Provider extends Component {

  //Allows the authenticated user to persist across app, addition of cookie
  //makes it possible for authUser to persist across reloads
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    //Allows us to access the helper class functions from Data.js
    this.data = new Data();
  }

  //signIn function handles user sign in by collecting the email and password
  //and making a call to the API to get the appropriate user
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    
    //If there is a matching user, that user's information becomes the 
    //authenticatedUser
    if (user !== null) {
      this.setState(() => {
        user.password = password
        return {
          authenticatedUser: user,
        };
      });
      //Set cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  //signOUt handles the signOut by resetting the state of authUser to null
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
