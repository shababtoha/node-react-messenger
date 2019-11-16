import React from 'react';
import Toolbar from '../presentational/toolbar';
import ConversationSearch from '../presentational/conversationSearch';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcons from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles/index';



const styles =  theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        height: '100vh',
    },
});


const conversationView = (props) => {
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
            <div style={{ overflowY : "scroll", minHeight: '100vh' }}>
                <ConversationSearch/>
                <div>
                    {props.conversation}
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(conversationView);