import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Typography } from '@material-ui/core/';
import classNames from 'classnames';
import moment from 'moment';
import HeartIcon from '@material-ui/icons/FavoriteBorder';
import styles from './styles';
const post = props => {
  const {
    classes,
    profilePicture,
    data,
    index,
    onOpenPopUp,
    canLike,
    t,
    language
  } = props;
  const { total_count } = data.reactions.summary;
  const onClickLink = url => {
    window.open(url, '_blank');
  };
  const { value, description } = data.privacy;
  const { created_time } = data;
  moment.locale(language);
  const ms = Date.parse(created_time);
  const date = new Date(ms);
  const checkPublic =
    value === 'EVERYONE' && description === 'Public'
      ? Boolean(true)
      : Boolean(false);
  return (
    <div
      className={classNames(classes.post, {
        [classes.red]: !checkPublic,
        [classes.green]: checkPublic
      })}
    >
      <Paper className={classes.postPaper}>
        <img className={classes.avatar} src={profilePicture} />
        <Typography variant="h4" gutterBottom>
          {data.message}
        </Typography>
        <img
          style={{ cursor: 'pointer' }}
          onClick={() => onClickLink(data.link)}
          src={data.picture}
          className={classes.picture}
        />
        <div className={classes.actionLikeDiv}>
          <div className={classes.likeDiv}>
            <HeartIcon style={{ marginRight: 8 }} />
            <Typography variant="caption">
              {total_count} {t('like')}
            </Typography>
          </div>
          {checkPublic ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onOpenPopUp(index)}
              disabled={canLike ? Boolean(false) : Boolean(true)}
            >
              {t('boost_like')}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onClickLink(`https://facebook.com/${data.id}`)}
            >
              {t('alert_privacy')}
            </Button>
          )}

          <div>
            <Typography variant="caption">{moment(date).fromNow()}</Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
};
export default withStyles(styles)(post);
