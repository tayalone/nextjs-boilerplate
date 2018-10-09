import { p, pHover } from '../../config/color';
const styles = theme => ({
  avatar: {
    marginRight: 10,
    float: 'left',
    width: 50,
    height: 50
  },
  picture: {
    width: '100%',
    height: 'auto',
    margin: '8px 0'
  },
  post: {
    padding: theme.spacing.unit * 2,
    margin: '16px auto',
    border: '1px dashed gainsboro',
    borderRadius: 5,
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
  },
  postPaper: {
    padding: theme.spacing.unit * 2,
    minHeight: 120
  },
  actionLikeDiv: {
    margin: '8px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  likeDiv: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: `${p} !important`,
    '&:hover': {
      color: `${pHover} !important`
    }
  }
});

export default styles;
