import React, { Fragment } from 'react';
import Input from "../presentational/Input";
import { ApolloConsumer } from 'react-apollo/lib/index';
import {Link} from "react-router-dom";
import { LoginModal, LoginForm, Button } from './styles'




const renderAlternateLink = (signUp) => {
    if(signUp) {
        return (
            <Fragment>
                already have an account? log in
                <Link to="/login"> here </Link>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                don't have an account? sign up
                <Link to="/signup"> here </Link>
            </Fragment>
        )
    }
};


const LoginView = (props) => {
    return (
        <LoginModal>
            <LoginForm>
                <div style={{ width: '100%', textAlign : 'center' }}>
                    <h2>React Messenger</h2>
                </div>
                <p> { props.signUp ? "Sign Up" : "Log In" }</p>
                <Input
                    type="text"
                    label="Username"
                    onChange={props.onUsernameChange}
                    value={props.username}
                />
                {
                    props.signUp &&
                    <Input
                        type="email"
                        label="Email"
                        onChange={props.onEmailChange}
                        value={props.email}

                    />
                }
                <Input
                    type="password"
                    label="Password"
                    onChange={props.onPasswordChange}
                    value={props.password}
                />
                <ApolloConsumer>
                    {client => (
                        <Button
                            onClick={async()=> props.onClick(client)}
                        >
                            { props.signUp ? "Create My Account" : "Log In" }
                        </Button>
                    )}
                </ApolloConsumer>
                <div style={{ marginTop: '10px', textAlign: 'right', fontSize : 15 }}>
                    {renderAlternateLink(props.signUp)}
                </div>
            </LoginForm>
        </LoginModal>
    )
};

export default LoginView;