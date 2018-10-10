import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Router from 'next/router';

export default ({ classes, Type, isLoading }) => {
  const clickLink = type => {
    Router.push({
      pathname: `/${type}`
    });
  };
  return (
    <Grid container spacing={8}>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={
            Type === 'like'
              ? Boolean(true)
              : isLoading
                ? Boolean(true)
                : Boolean(false)
          }
          onClick={() => clickLink('like')}
        >
          Like
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={
            Type === 'follow'
              ? Boolean(true)
              : isLoading
                ? Boolean(true)
                : Boolean(false)
          }
          onClick={() => clickLink('follow')}
        >
          Follow
        </Button>
      </Grid>
    </Grid>
  );
};
