import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Router from 'next/router';

export default ({ classes, Type, isLoading, country, language, t }) => {
  const clickLink = type => {
    Router.push({
      pathname: `/${country}/${language}/${type}`
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
          {t('common:like_page')}
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
          {t('common:follow_page')}
        </Button>
      </Grid>
    </Grid>
  );
};
