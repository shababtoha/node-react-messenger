import React, { Component } from "react";
import Messenger from "./components/messenger/messenger";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import history from "./history";
import Login from "./components/login/login";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route
                            path="/login"
                            exact
                            component={() => <Login signUp={false} />}
                        />
                        <Route
                            path="/signup"
                            exact
                            component={() => <Login signUp={true} />}
                        />
                        <Route
                            path="/message/:id?"
                            exact
                            component={() => <Messenger />}
                        />
                        <Route
                            path="/"
                            exact
                            component={() => <Redirect to="/message" />}
                        />
                        <Route path="*" component={() => <ErrorPage />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
