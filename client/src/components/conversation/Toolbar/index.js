import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import AddCircle from "@material-ui/icons/AddCircle";
import Search from "@material-ui/icons/Search";
import Backspace from "@material-ui/icons/Backspace";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "./Menu";
import styles from "./styles";
import avatar from "../../../assets/avatar.jpg";

const useStyles = makeStyles(styles);

const Toolbar = props => {
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles();
  const { searchText, setSearchText, handleAddButtonClick } = props;

  const handleSettingsClick = event => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  const renderLeft = () => (
    <Grid container>
      <Grid item xs={4}>
        <Avatar className={classes.avatar} src={avatar} alt={avatar} />
      </Grid>
      <Grid item xs={8} className={classes.title}>
        <Typography variant="h6">Conversations</Typography>
      </Grid>
    </Grid>
  );

  const renderRight = () => (
    <Grid container direction="row-reverse">
      <Grid item xs={3}>
        <IconButton onClick={handleAddButtonClick} color="primary">
          <AddCircle />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={handleSettingsClick} color="primary">
          <Settings />
        </IconButton>
      </Grid>
      <Menu anchor={anchor} handleClose={handleMenuClose} />
    </Grid>
  );

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          {renderLeft()}
        </Grid>
        <Grid item xs={6}>
          {renderRight()}
        </Grid>
      </Grid>
      <Paper className={classes.searchWrapper} elevation={2}>
        <Search />
        <input
          className={classes.searchInput}
          placeholder="Search conversations"
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Backspace
          className={classes.backspace}
          fontSize="small"
          onClick={() => setSearchText("")}
        />
      </Paper>
    </>
  );
};

export default Toolbar;
