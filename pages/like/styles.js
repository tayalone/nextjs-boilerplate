const styles = theme => ({
  root: {
    padding: 8,
    margin: 8
  },
  paperVIP: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '16px auto',
    '@media (max-width: 599px)': {
      width: '65%'
    },
    '@media (min-width: 600px)': {
      width: '55%'
    },
    '@media (min-width: 960px)': {
      width: '40%'
    },
    '@media (min-width: 1280px)': {
      width: '35%'
    },
    '@media (min-width: 1920px)': {
      width: '25%'
    }
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '16px auto',
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
    '@media (min-width: 1920px)': {
      width: '50%'
    }
  }
});

export default styles;
