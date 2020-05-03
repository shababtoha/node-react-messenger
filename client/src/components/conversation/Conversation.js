import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
  container: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      background: "#eeeef1",
    },
  },
  avatar: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  textWrapper: {
    marginRight: theme.spacing(2),
    width: 250,
    flexGrow: 1,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 16,
    margin: 0,
  },
  text: {
    color: "#888",
    margin: 0,
    fontSize: 13,
  },
  menu: {
    zIndex: 100,
  },
}));

const Conversation = (props) => {
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles();

  const handleMenuIconClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete();
    }
      handleMenuClose();
  };

  return (
    <div
      className={props.title ? classes.container : classes.hidden}
      onClick={() => props.onClick(props.conversationId)}
    >
      <Avatar
        className={classes.avatar}
        src={props.avatar}
        alt={props.avatar}
      />
      <div className={classes.textWrapper}>
        <Typography noWrap className={classes.title} variant="h6">
          {" "}
          {props.title}{" "}
        </Typography>
        <Typography
          noWrap
          className={classes.text}
          variant="subtitle1"
          paragraph
        >
          {" "}
          {props.text}{" "}
        </Typography>
      </div>
      <MenuIcon className={classes.menu} onClick={handleMenuIconClick} />
      <Menu
        keepMounted
        elevation={2}
        onClose={handleMenuClose}
        anchorEl={anchor}
        open={anchor != null}
        getContentAnchorEl={null}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem button onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Conversation;
