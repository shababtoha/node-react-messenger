import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import LoginView from './loginView';
import { LOGIN_QUERY,SIGN_UP_QUERY}  from "./queries";


class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            signUp: props.signUp,
            email: "",
            password: "",
            username: "",
            errors: {}
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLoginClick(client) {
        client.query({
            query: LOGIN_QUERY,
            variables: {
                username: this.state.username,
                password: this.state.password
            }
        }).then(result => {
            client.resetStore().then(()=>{
                localStorage.setItem("authToken", result.data.login.token);
                this.props.history.push('/message');
            });
        }).catch(error => {
            console.log(error);
        });
    }

    handleSignUpClick(client) {
        client.mutate({
            mutation: SIGN_UP_QUERY,
            variables: {
                UserInput: {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    name: "absd sad as das",
                    phone: null,
                    image_url: null,
                }
            }
        }).then(result=>{
            client.resetStore().then(()=>{
                localStorage.setItem("authToken", result.data.register.token);
                this.props.history.push('/message');
            });
        }).catch(error => {
           console.log(error);
        });
    }

    render() {
        return <LoginView
            {...this.state}
            onClick={ this.state.signUp ? this.handleSignUpClick : this.handleLoginClick}
            onEmailChange={ this.handleEmailChange }
            onPasswordChange={this.handlePasswordChange}
            onUsernameChange={this.handleUsernameChange}
        />
    }
}

export default withRouter(Login);