import { lb, lbHover, g, gHover, r, rHover } from '../../config/color';

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
    borderRadius: 8,
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
  },
  alertDiv: {
    borderRadius: 8,
    margin: '16px 0',
    display: 'flex',
    alignItems: 'center',
    '& *': {
      padding: 8
    }
  },
  btnDiv: {
    margin: '16px 0',
    '& *': {
      margin: '8px 0'
    }
  },
  green: {
    color: gHover,
    backgroundColor: g
  },
  blue: {
    color: lbHover,
    backgroundColor: lb
  },
  red: {
    color: rHover,
    backgroundColor: r
  },
  link: {
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  modalPapper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

export default styles;
