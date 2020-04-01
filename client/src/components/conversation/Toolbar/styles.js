const styles = theme => ({
  container: {
    padding: theme.spacing(1)
  },
  title: {
    alignSelf: 'center'
  },
  avatar: {
    width: 40,
    height: 40
  },
  searchWrapper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    background: '#E3E6E8',
    position: 'relative',
    width: '85%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '17px'
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

export default styles;