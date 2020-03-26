import React from 'react';
import Toolbar from '../presentational/toolbar';
import ConversationSearch from '../presentational/conversationSearch';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcons from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles/index';
import IconButton from '@material-ui/core/IconButton';


const styles =  theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        height: '100vh',
    },
});
{/*<IconButton*/}
{/*    <SettingsIcon color="primary" style={{ fontSize: 25 }}/>*/}
{/*</IconButton>*/}

const conversationView = (props) => {
    const {classes} = props;
    let leftIcons = [
        <IconButton>
            <SettingsIcon color="primary" style={{ fontSize: 25 }}/>
        </IconButton>
    ];
    let rightIcons = [
        <IconButton onClick={props.addConversationButtonClick}>
            <AddIcons color="primary"
                      style={{ fontSize: 25 }}
            />
        </IconButton>
    ];
    let leftItems = leftIcons.map((item,key) => <span key={key} > {item} </span>  );
    let rightItems = rightIcons.map((item,key) => <span key={key} > {item} </span> );
    return (
        <div  className={classes.container}>
            <Toolbar
                title={ "Messenger" }
                leftItems = {leftItems}
                rightItems = {rightItems}
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