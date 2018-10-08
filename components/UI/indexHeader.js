import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import TestIcon from '@material-ui/icons/Favorite';

export default ({ classes }) => {
  return (
    <Grid className={classes.flexRow} item xs={12}>
      <Typography variant="h2" gutterBottom>
        Popone.co
      </Typography>
      <div>
        <TestIcon />
        <TestIcon />
        <TestIcon />
        <TestIcon />
        <TestIcon />
        <TestIcon />
      </div>
    </Grid>
  );
};
