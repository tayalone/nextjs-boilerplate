import React from 'react';
import { Grid, Typography } from '@material-ui/core';
export default ({ classes }) => {
  return (
    <Grid className={classes.footer} item xs={12}>
      <Typography variant="caption" gutterBottom align="center">
        Copyright (C) 2018 popone.co
      </Typography>
    </Grid>
  );
};
