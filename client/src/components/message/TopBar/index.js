import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Call from '@material-ui/icons/Call';
import Videocam from '@material-ui/icons/Videocam';
import { makeStyles } from '@material-ui/core/styles';
import avatar from '../../../assets/avatar.jpg';

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: '0 1px 2px #888'
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: 40,
    height: 40
  },
  title: {
    flex: 1,
  }
}));

const TopBar = props => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.container}>
      <Avatar
        className={classes.avatar}
        src={avatar}
        alt={avatar}
      />
      <Typography className={classes.title} variant="h5">
        {props.title}
      </Typography>
      <IconButton color="primary">
        <Call />
      </IconButton>
      <IconButton color="primary">
        <Videocam />
      </IconButton>
    </Toolbar>
  );
};

export default TopBar;