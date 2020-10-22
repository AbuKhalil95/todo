import React from 'react';
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

export const AuthContext = React.createContext();

const API = "https://todoapi-ahmad.herokuapp.com/api/v1/user";

class AuthProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn : false,
            login: this.login,
            logout: this.logout,
            user: {},
            isValidAction: this.isValidAction
        }

    }

    isValidAction = (action)=> {
        const actions = {
            admin: ['edit', 'delete', 'read'],
            user : ['read'],
            editor: ['edit', 'read']
        };

        const role = this.state.user.role.toLowerCase();
        console.log("role : ",role)
        console.log("actions[role].includes(action): ",actions[role].includes(action))
        return actions[role].includes(action)

    }

    login = async (username, password)=> {
        try {
            
            const encodedData = base64.encode(`${username}:${password}`);
            const result = await fetch(`${API}/signin`, {
                method: 'post',
                mode: 'cors',
                cache: 'no-cache',
                headers: { 'Authorization': `Basic ${encodedData}` }
            });

            let res = await result.json();
            console.log("res: ",res)
            // res has token {token: token, user: user};
            this.validateToken(res.token);

        } catch(e) {
            console.log("error : ", e)
        }
    }

    validateToken = (token)=> {
        // validate token using jwt 
        // we can use jwt.verify against secret-> .env
        console.log("token >>> ",token)
        let user = jwt.decode(token) // from docs its not very recommended .
        console.log("user >>>> ",user)
        // // jwt lets try without secret.
        // // get user object
        if (user) {
            this.setAuthState(true, token, user)  // to set cookie and update state.
        } 
    }

    setAuthState = (loggedIn, token, user)=> {
        console.log("here ")
        cookie.save('auth', token);  // save token as a cookie in browser
        //update conext with user object 
        this.setState({loggedIn, user})
    }

    logout = ()=> {
        this.setAuthState(false, null, {});
    }


    componentDidMount() {
        // get the cookie -> validate cookie -> of valid -> update the state 
        const cookieToken = cookie.load('auth');
        const token = cookieToken || null;
        this.validateToken(token);
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }

}

export default AuthProvider;