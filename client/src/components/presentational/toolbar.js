import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    toolbar : {
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        borderBottom: "1px solid #eeeef1",
        position: "sticky",
        top: "0px",

    },
    leftItems : {
        flex: 1,
        padding: 10,
        display: "flex",
    },
    title : {
        fontSize : 16,
        fontWeight : 800
    },
    rightItems : {
        flex: 1,
        padding: 10,
        display: "flex",
        flexDirection : 'row-reverse',
    }

});

const toolbar = (props) => {
    const {classes, leftItems, title, rightItems} = props;
    return (
        <div className={classes.toolbar} >
            <div className={classes.leftItems}> {leftItems} </div>
            <Typography className={classes.title} variant="h5"> {title} </Typography>
            <div className={classes.rightItems} > {rightItems} </div>
        </div>
    )
};

export default withStyles(styles)(toolbar);