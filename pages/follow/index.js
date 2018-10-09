import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProfileHeader from '../../components/ProfileHeader';
import SwitchPage from '../../components/UI/switchPage';

const styles = theme => ({
  root: {
    padding: 8,
    margin: 8
  },
  container: {},
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
class index extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <SwitchPage classes={classes} Type={'follow'} />
        </Paper>
        <Paper className={classes.paper}>
          <ProfileHeader />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(index);
