import React, { Component, Fragment } from 'react';
import Router from 'next/router';
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
    facebookToken: '',
    action: ''
  };
  closeModal = () => {
    this.setState({
      facebookToken: '',
      action: ''
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
  render() {
    const { open, classes } = this.props;
    const { action } = this.state;
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={this.closeModal.bind(this)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.closeDiv}>
          <IconButton
            className={classes.button}
            aria-label="close-modal"
            onClick={this.closeModal.bind(this)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-slide-title">
          {'เลือกออปชั่นสำหรับโพสต์'}
        </DialogTitle>
        <DialogContent className={classes.likeDialogBody}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal.bind(this)} color="secondary">
            ปิด ปอปอัพ
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(index);
