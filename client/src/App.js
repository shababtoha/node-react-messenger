import React, { Component }  from 'react';
import Messenger from './components/messenger/messenger'
// import NavBar from './components/container/navBarContainer';
import {BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './components/login/login';


class App extends Component{
    render() {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route path="/login" exact component={ ()=> <Login signUp={false} /> } />
                        <Route path="/signup" exact component={ ()=> <Login signUp={true} /> } />
                        <Route path="/message/*" exact component={ ()=> <Messenger/>} />
                        <Route path="*" component={()=> <Redirect to="/message/" />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;