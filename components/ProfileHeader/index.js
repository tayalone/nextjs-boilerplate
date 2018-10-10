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
      onClickSwitch,
      isVip,
      nextTime,
      lastUpdated,
      delay_sec,
      diffVipTime_sec,
      vip_date,
      countDown
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
                  Status : {isVip ? 'VIP user' : 'Free user'}
                </Typography>
              </div>
              <div>
                <Typography variant="body1" gutterBottom>
                  เวลา vip : {isVip ? vip_date : '-'}
                </Typography>
              </div>
              <div>
                <Typography variant="body1" gutterBottom>
                  เวลาใช้งานล่าสุด : {countDown > 0 ? lastUpdated : '-'}
                </Typography>
              </div>
              {countDown > 0 ? (
                <div>
                  <Typography variant="body1" gutterBottom>
                    สามารถใช้งานครั้งต่อไปใน {parseInt(countDown)} วินาที
                  </Typography>
                </div>
              ) : null}
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
