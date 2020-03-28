import React, { Component }  from 'react';
import Messenger from './components/messenger/messenger'
// import NavBar from './components/container/navBarContainer';
import {Router, Route, Redirect, Switch } from "react-router-dom";
import history from './history';
import Login from './components/login/login';


class App extends Component{
    render() {
        return(
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/login" exact component={ ()=> <Login signUp={false} /> } />
                        <Route path="/signup" exact component={ ()=> <Login signUp={true} /> } />
                        <Route path="/message/:id?" exact component={ ()=> <Messenger/>} />
                        <Route path="*" component={()=> <Redirect to="/message/" />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;