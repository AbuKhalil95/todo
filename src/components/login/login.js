import React from 'react';
import { AuthContext } from '../../context/auth.js';
import Show from './show';

class Login extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state)
        console.log("in handleSubmit")
        await this.context.login(this.state.username, this.state.password);
        this.props.getAuth(this.context.loggedIn ? true : false);
    }

    handleLogout = e => {
        console.log(this.state)
        console.log("logging out")
        this.context.logout();
        this.props.getAuth(false);
    }

    render() {
        console.log("this.context.loggedIn >> ",this.context.loggedIn)

        return (
            <>
                <Show condition={this.context.loggedIn}>
                    <button onClick={this.handleLogout}>Logout</button>
                </Show>
                <Show condition={!this.context.loggedIn}>
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleChange} placeholder="username" name="username" />
                        <input onChange={this.handleChange} placeholder="password" name="password" />
                        <button>Login</button>
                    </form>
                </Show>
            </>
        )
    }

}

export default Login;