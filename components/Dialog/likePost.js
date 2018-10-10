import React, { Component, Fragment } from 'react';
import HeartIcon from '@material-ui/icons/FavoriteBorder';
import Spinner from '../UI/spinner';
import delay from '../../lib/delay';
import {
  Button,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import classNames from 'classnames';

function Transition(props) {
  return <Slide timeout={1500} direction="down" {...props} />;
}

class index extends Component {
  state = {
    action: '',
    ageMin: 18,
    ageMax: 40,
    friendTotalMin: 50,
    friendTotalMax: 1500,
    gender: 'random'
  };
  closeModal = () => {
    this.setState({
      action: '',
      ageMin: 18,
      ageMax: 40,
      friendTotalMin: 50,
      friendTotalMax: 1500,
      gender: 'random'
    });
    this.props.closeModal();
  };
  selectRaction = action => {
    const { action: oldActon } = this.state;
    if (oldActon === action) {
      this.setState({ action: '' });
    } else {
      this.setState({ action });
    }
  };
  punpLike = () => {
    const {
      action,
      ageMin,
      ageMax,
      friendTotalMin,
      friendTotalMax,
      gender
    } = this.state;
    console.log(action, ageMin, ageMax, friendTotalMin, friendTotalMax, gender);
    this.props.onPumpLike(
      action,
      ageMin,
      ageMax,
      friendTotalMin,
      friendTotalMax,
      gender
    );
  };
  render() {
    const { open, classes, data, likeState } = this.props;
    const { action } = this.state;
    let total_count = 0;

    if (data) {
      total_count = data.reactions.summary.total_count;
    }
    if (likeState === 'done') {
      setTimeout(() => {
        this.closeModal();
      }, 1500);
    }
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {likeState === 'init' ? (
          <div className={classes.closeDiv}>
            <IconButton
              className={classes.button}
              aria-label="close-modal"
              onClick={this.closeModal.bind(this)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ) : null}

        <DialogTitle id="alert-dialog-slide-title">
          {'เลือกออปชั่นสำหรับโพสต์'}
        </DialogTitle>
        <DialogContent className={classes.likeDialogBody}>
          <div className={classes.likeDiv}>
            <HeartIcon style={{ marginRight: 8 }} />
            <Typography variant="caption">{total_count} ไลค์</Typography>
          </div>
          {likeState === 'init' ? (
            <div>
              {action ? (
                <Typography variant="subtitle2" gutterBottom>
                  รีแอคขั่น : {action}
                </Typography>
              ) : null}

              <div className={classes.reactionDiv}>
                <div
                  className={classNames({
                    [classes.selectedReaction]: action === 'LIKE'
                  })}
                  onClick={() => this.selectRaction('LIKE')}
                >
                  <img
                    className={classes.reactionIcon}
                    src="../../static/like.png"
                  />
                </div>
                <div
                  className={classNames({
                    [classes.selectedReaction]: action === 'LOVE'
                  })}
                  onClick={() => this.selectRaction('LOVE')}
                >
                  <img
                    className={classes.reactionIcon}
                    src="../../static/love.png"
                  />
                </div>
                <div
                  className={classNames({
                    [classes.selectedReaction]: action === 'HAHA'
                  })}
                  onClick={() => this.selectRaction('HAHA')}
                >
                  <img
                    className={classes.reactionIcon}
                    src="../../static/haha.png"
                  />
                </div>
                <div
                  className={classNames({
                    [classes.selectedReaction]: action === 'WOW'
                  })}
                  onClick={() => this.selectRaction('WOW')}
                >
                  <img
                    className={classes.reactionIcon}
                    src="../../static/wow.png"
                  />
                </div>
                <div
                  className={classNames({
                    [classes.selectedReaction]: action === 'SAD'
                  })}
                  onClick={() => this.selectRaction('SAD')}
                >
                  <img
                    className={classes.reactionIcon}
                    src="../../static/sad.png"
                  />
                </div>
                <div
                  className={classNames({
                    [classes.selectedReaction]: action === 'ANGRY'
                  })}
                  onClick={() => this.selectRaction('ANGRY')}
                >
                  <img
                    className={classes.reactionIcon}
                    src="../../static/angry.png"
                  />
                </div>
              </div>
            </div>
          ) : likeState === 'process' ? (
            <Spinner size={60} />
          ) : likeState === 'done' ? null : null}
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          {likeState === 'init' ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.punpLike.bind(this)}
              disabled={action === '' ? Boolean(true) : Boolean(false)}
            >
              ปั้ม Like
            </Button>
          ) : likeState === 'done' ? (
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              style={{ color: 'green' }}
            >
              ปั้มไลค์สำเร็จ
            </Typography>
          ) : null}
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(index);
