import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme =>({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        [theme.breakpoints.up('sm')]: {
            display : 'none'
        }
    },
    appBar: {
        backgroundColor : "#44813D"
    },

});


class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            anchorEl : null
        };
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleProfileClick = this.handleProfileClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
        console.log(this.state);
    }

    handleClose() {
        this.setState({ anchorEl: null });

    }

    handleProfileClick() {
        //todo-> implement profile click
    }

    handleLogout() {
        //todo->implement logout
    }

    render() {
        const {classes} = this.props;
        const open = Boolean(this.state.anchorEl);

        const menu = (
            <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
            >
                <MenuItem onClick={this.handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <ToolBar>
                        <MenuIcon
                            color="inherit"
                            aria-label="open drawer"
                            className={classes.menuButton}
                        />
                        <Typography variant="h6" color="inherit" style={{paddingLeft: 10 , flex : 1}} noWrap>
                            Django-React Messenger
                        </Typography>

                        <IconButton
                            aria-owns={open? 'menu-appbar' : undefined }
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                            className={classes.menu}
                        >
                            <AccountCircle/>
                        </IconButton>
                        {menu}
                    </ToolBar>
                </AppBar>
            </div>
        )
    }
};

export default withStyles(styles)(NavBar);