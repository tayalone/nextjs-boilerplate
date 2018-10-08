const styles = theme => ({
  root: {
    padding: 16
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  indexContainer: {
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    height: '100vh'
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 900px)': {
      flexDirection: 'column'
    }
  },
  indexContent: {
    border: '1px black dashed',
    padding: 16,
    margin: '0 auto',
    width: '80%',
    '@media (max-width: 599px)': {
      width: '95%'
    },
    '@media (min-width: 600px)': {
      width: '90%'
    },
    '@media (min-width: 960px)': {
      width: '75%'
    },
    '@media (min-width: 1280px)': {
      width: '60%'
    },
    '@media (min-width: 19200px)': {
      width: '60%'
    }
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});

export default styles;
