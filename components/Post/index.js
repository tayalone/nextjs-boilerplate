import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HeartIcon from '@material-ui/icons/FavoriteBorder';
import styles from './styles';
const post = ({ classes }) => {
  return (
    <div className={classes.post}>
      <Paper className={classes.postPaper}>
        <img
          className={classes.avatar}
          src="https://via.placeholder.com/50x50"
        />
        <Typography variant="h4" gutterBottom>
          h4. Heading
        </Typography>
        <img
          src="https://via.placeholder.com/600x200"
          className={classes.picture}
        />
        <div className={classes.actionLikeDiv}>
          <div className={classes.likeDiv}>
            <HeartIcon style={{ marginRight: 8 }} />
            <Typography variant="caption">0 like</Typography>
          </div>
          <Button variant="contained" color="primary">
            ปั้มไลค์
          </Button>
          <div>
            <Typography variant="caption">time</Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
};
export default withStyles(styles)(post);
