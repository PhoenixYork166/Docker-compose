import React, { Component } from "react";
import classes from './Signin.module.css';

// Parent component
// src/App.js
class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInEmail: '',
      signInPassword: '',
      lockSignIn: true,
      hint: ''
    }
  }

  // Listens to onChange events of email && password <input>
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value }, () => {
      this.validateInputs();
      // console.log('this.state.signInEmail: \n', this.state.signInEmail);
    })
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value }, () => {
      this.validateInputs();
      // console.log('this.state.signInPassword: \n', this.state.signInPassword);
    })
  }

  onIncorrect = () => {
    this.setState( { hint: 'Incorrect credentials, try again' });
  }

  // App 'Sign In' button onClick event handler
  onSubmitSignIn = (event) => {
    event.preventDefault(); // Stop page from refreshing on Signin form submission

    this.devSigninUrl = 'http://localhost:3001/signin';
    this.prodSigninUrl = 'https://ai-recognition-backend.onrender.com/signin';

    const fetchUrl = process.env.NODE_ENV === 'production' ? this.prodSigninUrl : this.devSigninUrl;

    // Fetching http://localhost:3001/signin to retrieve user
    fetch(fetchUrl, {
      method: 'post', // Post (Create) to avoid Query Strings
      headers: {'Content-Type': 'application/json'},
      credentials: 'include', // Include credentials to handle cookies
      body: JSON.stringify({ // sending stringified this.state variables as JSON objects
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json()) // http://localhost:3001/signin server response to parse JSON data user
    .then((response) => {
      if (response) {
        // Fetch user data from another endpoint that returns the user data from the session
        const devFetchUserUrl = `http://localhost:3001/api/get-user-data`;
        const prodFetchUserUrl = `https://ai-recognition-backend.onrender.com/api/get-user-data`;
        const fetchUserUrl = process.env.NODE_ENV === 'production' ? prodFetchUserUrl : devFetchUserUrl;

        fetch(fetchUserUrl, { credentials: 'include' })
        .then(response => response.json())
        .then((user) => {
          if (user) {
            this.props.onRouteChange('home');
            this.props.saveUser(user); // src/App.js
          } else {
            // Reset users' inputed password
          const signInPasswordInput = document.querySelector('#current-password');
          this.props.onRouteChange('signin');
          signInPasswordInput.value = '';
          this.onIncorrect();
          }
        })
        .catch((err) => {
          console.error(`\nFailed to fetch user data through ${fetchUserUrl}\n`);
        })
      } 
    })
    .catch((err) => {
      console.error(`\nFailed to fetch ${fetchUrl} for signing users in:\n${err}\n`);
    })
    // .then(user => { // server.js - app.post('/signin') --> res.json(database.users[i])
    //   console.log('onSubmitSignIn - response: \n', user);
    //   console.log('onSubmitSignIn - typeof response: \n', typeof user);
    //   if (user.id) { // if user.id exists upon successful fetching from db
    //     // Invoke App.js saveUserToLocalStorage 
    //     this.props.saveUserToLocalStorage(user);

    //     // Invoke App.js loadUserFromLocalStorage to this.setState(user:{})
    //     this.props.loadUserFromLocalStorage();

    //     this.props.onRouteChange('home');
    //   } else if (!user.id) { // if user.id does NOT exist
    //     // Reset users' inputed password
    //     const signInPasswordInput = document.querySelector('#current-password');
    //     this.props.onRouteChange('signin');
    //     signInPasswordInput.value = '';
    //     this.onIncorrect();
    //   }
    // })
  }

  validateInputs = () => {
    if (this.state.signInEmail.length > 0 && this.state.signInPassword.length > 0) {
      this.setState({
        lockSignIn: false
      })
    } else {
      this.setState({
        lockSignIn: true
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.lockSignIn !== prevState.lockSignIn) {
      this.validateInputs();
    }
  }

  render() {
    const { onRouteChange } = this.props;

    return (
      <div>
        <article className={`${classes.article}`} >
        <main className={`${classes.main}`}>
          <form className="measure">
            <fieldset id="sign_up" className={`${classes.fieldset}`}>
              <legend className={`${classes.legend}`}>Sign In</legend>
              <div className={`${classes.emailContainer}`}>
                <label 
                className={`${classes.emailLabel}`} 
                htmlFor="email-address"
                >
                  Email
                </label>
                <input
                  className={`${classes.emailInput}`}
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                  placeholder='Enter email'
                />
              </div>
              <div className={`${classes.passwordContainer}`}>
                <label 
                  className={`${classes.passwordLabel}`} 
                  htmlFor="current-password"
                >
                  Password
                </label>
                <input
                  className={`${classes.passwordInput}`}
                  type="password"
                  autoComplete="off"
                  name="current-password"
                  id="current-password"
                  onChange={this.onPasswordChange}
                  placeholder='Enter password'
                />
              </div>
              <p className={`${classes.hint}`}>
                {this.state.hint}
              </p>
              {/* <label className="pa0 ma0 lh-copy f6 pointer">
                <input type="checkbox" /> Remember me
              </label> */}
            </fieldset>
            <div className={`${classes.signInBox}`}>
              <input
                // onClick={() => onRouteChange('home')}
                onClick={this.onSubmitSignIn}
                disabled={this.state.lockSignIn}
                className={`${classes.signinBtn}`}
                type="submit"
                value=" Sign In "
              />
            </div>
            <div className={`${classes.registerBox}`}>
              <input
               onClick={() => onRouteChange('register')} 
               className={`${classes.signinBtn}`}
               type="submit"
               value="Register"
              />
            </div>
          </form>
        </main>
        </article>
      </div>
    );
  }
};

export default Signin;
