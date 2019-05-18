import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';


export const drawerWidth = 380;
export const smDrawerWidth =  240;

const styles = theme => ({
    toolbar : theme.mixins.toolbar,
    root : {
        width : drawerWidth,
        borderRight : "1px solid #B0B3AF",
        height : '100vh',
        position: 'fixed',
        overflowY : 'scroll',
        [theme.breakpoints.between('xs','sm')]: {
            width: smDrawerWidth
        },
        [theme.breakpoints.down('xs')]: {
            display :'none'
        }
    }
});


class userContainer extends Component{
    constructor(props){
        super(props);
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root} >
                <div className={classes.toolbar} />
                <Divider/>
            </div>
        )
    }
}

export default withStyles(styles)(userContainer);