import React from 'react';
import Toolbar from './toolbar'
import { withStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';

const styles = theme => ({

});

const message = (property) => {
    return (
        <Toolbar
            title={ "conversationame" }
            rightItems = {[ <PhoneIcon key="phone" color="primary" fontSize="large"/> ]}
        />
    )
};


export default withStyles(styles)(message);