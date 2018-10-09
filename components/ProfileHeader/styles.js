const styles = theme => ({
  avatar: {
    borderRadius: '50%;',
    '@media (max-width: 599px)': {
      width: 75,
      heigth: 75
    },
    '@media (min-width: 600px)': {
      width: 100,
      heigth: 100
    },
    '@media (min-width: 960px)': {
      width: 125,
      heigth: 125
    },
    '@media (min-width: 1280px)': {
      width: 150,
      heigth: 150
    },
    '@media (min-width: 1920px)': {
      width: 175,
      heigth: 175
    }
  },
  data: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    justifyContent: 'space-around',
    '@media (max-width: 599px)': {
      alignItems: 'center'
    }
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
});

export default styles;
