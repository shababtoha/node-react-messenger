import React, { Fragment, Component }  from 'react';
import NavBar from './components/navBar'
import UserContainer from './components/userContainer';
import MessageContiner from './components/messageContainer';


class App extends Component{
    render() {
        return (
            <Fragment>
                <NavBar/>
                <UserContainer/>
                <MessageContiner/>
            </Fragment>
        )
    }
}

export default App;