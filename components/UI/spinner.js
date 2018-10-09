import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  div: {
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    padding: 8
  }
});
const spinner = ({ classes, size }) => {
  return (
    <div className={classes.div}>
      <CircularProgress size={size} />
    </div>
  );
};

export default withStyles(styles)(spinner);
