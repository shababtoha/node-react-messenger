import React, {Component} from 'react';
import {drawerWidth, smDrawerWidth} from './userContainer'
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';

const styles = theme => ({
    toolbar : theme.mixins.toolbar,
    root : {
        width : `calc(100% - ${drawerWidth}px)`,
        height: '100vh',
        marginLeft : drawerWidth,
        position : "fixed",
        overflowY : 'scroll',
        [theme.breakpoints.between('xs','sm')]: {
            width: `calc(100% - ${smDrawerWidth}px)` ,
            marginLeft: smDrawerWidth,
        },
        [theme.breakpoints.down('xs')]: {
            width : '100vh',
            marginLeft : 0,
        }
    }
});


class MessageContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

            </div>
        )
    }
}
export default withStyles(styles)(MessageContainer);