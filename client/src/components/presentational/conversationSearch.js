import React, { useState } from 'react';
import Search from '@material-ui/icons/Search';
import Backspace from '@material-ui/icons/Backspace';
import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        background: '#E3E6E8',
        padding: theme.spacing(1)
      },
      searchInput: {
        border: 0,
        width: '100%',
        background: 'inherit',
        paddingLeft: theme.spacing(1),
        '&:focus': {
          outline: 'none'
        }
      },
      backspace: {
          cursor: 'pointer'
      }
});
const useStyles = makeStyles(styles);

const Searchbox = props => {
    const classes = useStyles();
    const [text, setText] = useState('');

    return (
        <div className={classes.searchBox}>
          <Search />
          <input
            className={classes.searchInput}
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Search Messenger"
          />
          <Backspace
            className={classes.backspace}
            fontSize="small"
            onClick={() => setText('')}
          />
        </div>
    )
}

export default Searchbox;