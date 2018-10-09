import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProfileHeader from '../../components/ProfileHeader';
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
  state = { accessToken: '' };
  async componentDidMount() {
    const accessToken = localStorage.getItem('popone_accessToken');
    this.setState({ accessToken });
  }
  render() {
    const { accessToken } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <ProfileHeader />
        </Paper>
        <Paper className={classes.paper}>Profile</Paper>
        <Paper className={classes.paper}>Profile</Paper>
        <Paper className={classes.paper}>Profile</Paper>
        {/* <Grid justify={'center'} container spacing={24}>
          <Grid item xs={12} xl={6} lg={6} md={8}>
            <Paper className={classes.paper}>Profile</Paper>
          </Grid>
          <Grid item xs={12} xl={6} lg={6} md={8}>
            <Paper className={classes.paper}>post</Paper>
          </Grid>
        </Grid> */}
      </div>
    );
  }
}

export default withStyles(styles)(index);
