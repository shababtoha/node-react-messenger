import React, { useState } from 'react';
import Toolbar from '../presentational/toolbar';
import ConversationSearch from '../presentational/conversationSearch';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcons from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles/index';
import IconButton from '@material-ui/core/IconButton';
import Menu from './Menu';

const styles =  theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        height: '100vh',
    },
});
const useStyles = makeStyles(styles);

const ConversationView = props => {
    const classes = useStyles();
    const [anchor, setAnchor] = useState(null);

    const handleSettingsClick = event => {
        setAnchor(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchor(null);
    }

    let leftIcons = [
        <React.Fragment>
            <IconButton onClick={handleSettingsClick}>
                <SettingsIcon color="primary" style={{ fontSize: 25 }}/>
            </IconButton>
            <Menu
                anchor={anchor}
                handleClose={handleMenuClose}
            />
        </React.Fragment>
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

export default ConversationView;