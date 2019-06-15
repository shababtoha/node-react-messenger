import React from 'react';
import Toolbar from './toolbar';
import ConversationSearch from './conversationSearch';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcons from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';



const styles =  theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        height: '100%',
    },
});


const conversationContainer = (props) => {
    const {classes} = props;
    return (
        <div  className={classes.container}>
            <Toolbar
                title={ "Messenger" }
                leftItems = {[
                    <SettingsIcon color="primary" style={{ fontSize: 25 }}/>,
                ]}
                rightItems = {[
                    <AddIcons color="primary" style={{ fontSize: 25 }}/>,
                ]}
            />
            <div style={{ overflowY : "scroll" }}>
                <ConversationSearch/>
                <div>
                    {props.conversation}
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(conversationContainer);