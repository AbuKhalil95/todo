import React from 'react';
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

export const AuthContext = React.createContext();

class AuthProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn : false,
      login: this.login,
      logout: this.logout,
      user: {},
      isValidAction: this.isValidAction,
      API: 'https://jadwalla.herokuapp.com',
    };

  }

    isValidAction = (action)=> {
      const actions = {
        admin: ['edit', 'delete', 'read'],
        user : ['read'],
        editor: ['edit', 'read'],
      };

      const role = this.state.user.role.toLowerCase();
      console.log('role : ',role);
      console.log('actions[role].includes(action): ',actions[role].includes(action));
      return actions[role].includes(action);

    }

    login = async (username, password)=> {
      try {
            
        const encodedData = base64.encode(`${username}:${password}`);
        const result = await fetch(`${this.state.API}/signin`, {
          method: 'post',
          mode: 'cors',
          cache: 'no-cache',
          headers: { 'Authorization': `Basic ${encodedData}` },
        });

        let res = await result.json();
        console.log('res: ',res);
        this.validateToken(res.token);

      } catch(e) {
        console.log('error : ', e);
      }
    }

    validateToken = (token)=> {
      let user = jwt.decode(token);
      if (user) {
        this.setAuthState(true, token, user);  
      } 
    }

    setAuthState = (loggedIn, token, user)=> {
      cookie.save('auth', token);  
      this.setState({loggedIn, user});
    }

    logout = ()=> {
      this.setAuthState(false, null, {});
    }


    componentDidMount() {
      const cookieToken = cookie.load('auth');
      const token = cookieToken || null;
      this.validateToken(token);
    }

    render() {
      return (
        <AuthContext.Provider value={this.state}>
          {this.props.children}
        </AuthContext.Provider>
      );
    }

}

export default AuthProvider;
