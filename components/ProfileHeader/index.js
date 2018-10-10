import React, { Component, Fragment } from 'react';
import {
  Grid,
  Typography,
  Button,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Spinner from '../UI/spinner';
class index extends Component {
  printSpinner = size => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Spinner size={size} />
      </div>
    );
  };
  render() {
    const {
      classes,
      isLoading,
      name,
      profilePicture,
      type,
      auto,
      onClickSwitch
    } = this.props;
    const switchValue = auto === 1 ? true : false;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          {isLoading && !profilePicture ? (
            this.printSpinner(50)
          ) : (
            <div>
              <img className={classes.avatar} src={profilePicture} />
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={8} className={classes.data}>
          {isLoading && !name ? (
            this.printSpinner(50)
          ) : (
            <Fragment>
              <div>
                <Typography variant="body1" gutterBottom>
                  Name : {name}
                </Typography>
              </div>
              <div>
                <Typography variant="body1" gutterBottom>
                  Status : Free User
                </Typography>
              </div>
              <div>
                <Typography variant="body1" gutterBottom>
                  เวลา vip
                </Typography>
              </div>
              <div className={classes.action}>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={switchValue}
                        onChange={onClickSwitch}
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label={`Auto ${type}`}
                  />
                </div>
                <div>
                  <Button variant="contained" color="secondary">
                    Log Out
                  </Button>
                </div>
              </div>{' '}
            </Fragment>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(index);
