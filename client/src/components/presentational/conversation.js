import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Avatar, Typography} from "@material-ui/core";

const styles = theme => ({
    container : {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        '&:hover' : {
            background: "#eeeef1",
            cursor: "pointer"
        }
    },
    avatar: {
        height : 50,
        width : 50,
        marginRight : 10
    },
    conversationName: {
        fontSize: 16,
        textTransform : "capitalize",
        margin : 0,
    },
    conversationText: {
        margin : 0,
        color: "#888",
        fontSize: 13,
    }
});

const conversation = (props) => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <Avatar
                className={classes.avatar}
                src={props.avatar}
            />
            <div style={{ width : 250 }}>
                <Typography noWrap className={classes.conversationName} variant="h6"> { props.title } </Typography>
                <Typography noWrap className={classes.conversationText}  variant="subtitle1" paragraph> { props.text } </Typography>
            </div>
        </div>
    );
};

export default withStyles(styles)(conversation);