import React, { useContext } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOpen from '@material-ui/icons/LockOpen';
import history from '../../../history';
import UserContext from '../../../contexts/UserContext';

const MainMenu = props => {
  const user = useContext(UserContext);
  const { anchor, handleClose } = props;
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/login');
  }

  return (
    <Menu
      keepMounted
      elevation={2}
      onClose={handleClose}
      anchorEl={anchor}
      open={anchor != null}
      getContentAnchorEl={null}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      <MenuItem>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary={user.username} />
      </MenuItem>
      <MenuItem button onClick={handleLogout}>
        <ListItemIcon>
          <LockOpen />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </MenuItem>
    </Menu>
  );
};

export default MainMenu;
