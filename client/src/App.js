import React, { Component, Fragment }  from 'react';
import Messenger from './components/presentational/messenger'
import NavBar from './components/container/navBarContainer';

class App extends Component{
    render() {
        return(
            <Fragment>
                <NavBar/>
                <Messenger/>
            </Fragment>

        )
    }
}

export default App;