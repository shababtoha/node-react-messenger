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
        minHeight : 50,
        flex : "0 1",
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
        padding: 5,
        display: "flex",
        flexDirection : 'row-reverse',
    }

});

const toolbar = (props) => {
    let {classes, leftItems, title} = props;
    // const rightItems = props.rightItems.map( (item,key)=> <IconButton  key={key}> {item} </IconButton> );
    // if(leftItems) {
    //     leftItems = leftItems.map((item,key) =>
    //          <IconButton
    //             key={key}> {item}
    //         </IconButton>);
    // }
    return (
        <div className={classes.toolbar} >
            <div className={classes.leftItems}> {props.leftItems} </div>
            <Typography className={classes.title} variant="h5"  noWrap> {title} </Typography>
            <div className={classes.rightItems} > {props.rightItems} </div>
        </div>
    )
};

export default withStyles(styles)(toolbar);