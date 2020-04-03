import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container : {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
        '&:hover' : {
            background: "#eeeef1",
        }
    },
    avatar: {
        height : 50,
        width : 50,
        marginRight : 10
    },
    textWrapper: {
        width: 250
    },
    title: {
        textTransform : "capitalize",
        fontSize: 16,
        margin : 0,
    },
    text: {
        color: "#888",
        margin : 0,
        fontSize: 13,
    }
}));

const Conversation = (props) => {
    const classes = useStyles();
    
    return (
        <div
            className={classes.container}
            onClick={()=> props.onClick(props.conversationId)}
        >
            <Avatar
                className={classes.avatar}
                src={props.avatar}
                alt={props.avatar}
            />
            <div className={classes.textWrapper}>
                <Typography noWrap className={classes.title} variant="h6"> { props.title } </Typography>
                <Typography noWrap className={classes.text} variant="subtitle1" paragraph> { props.text } </Typography>
            </div>
        </div>
    );
};

export default Conversation;