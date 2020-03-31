import React, { useState } from 'react';
import Toolbar from '../presentational/toolbar';
import ConversationSearch from '../presentational/conversationSearch';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcons from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles/index';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from './Menu';
import avatar from '../../assets/avatar.jpg';

const styles =  theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        height: '100vh',
    },
    avatar: {
        width: 40,
        height: 40
    },
});
const useStyles = makeStyles(styles);

const ConversationView = props => {
    const [anchor, setAnchor] = useState(null);
    const classes = useStyles();

    const handleSettingsClick = event => {
        setAnchor(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchor(null);
    }

    let leftIcons = [
        <Avatar
            className={classes.avatar}
            src={avatar}
            alt={avatar}
        />
        ];
        let rightIcons = [
            <IconButton onClick={props.addConversationButtonClick}>
                <AddIcons color="primary"
                        style={{ fontSize: 25 }}
                />
            </IconButton>,
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
    let leftItems = leftIcons.map((item,key) => <span key={key} > {item} </span>  );
    let rightItems = rightIcons.map((item,key) => <span key={key} > {item} </span> );
    return (
        <div  className={classes.container}>
            <Toolbar
                title={ "Messenger" }
                leftItems = {leftItems}
                rightItems = {rightItems}
            />
            <ConversationSearch  />
            <div style={{ overflowY : "scroll" }}>
                {props.conversation}
            </div>
        </div>
    )
};

export default ConversationView;