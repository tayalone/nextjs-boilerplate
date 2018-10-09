import React, { Component } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
class index extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <div>
            <img
              className={classes.avatar}
              src="https://via.placeholder.com/200x200"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.data}>
          <div>
            <Typography variant="body1" gutterBottom>
              Name
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
                    checked={true}
                    // onChange={this.handleChange('checkedB')}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Auto Like"
              />
            </div>
            <div>
              <Button variant="contained" color="secondary">
                Log Out
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(index);
