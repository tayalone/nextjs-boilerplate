import React, { Component, Fragment } from 'react';
import HeartIcon from '@material-ui/icons/FavoriteBorder';
import Spinner from '../UI/spinner';
import Slider from 'rc-slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

function log(value) {
  console.log(value); //eslint-disable-line
}

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
    gender: 'both'
  };
  closeModal = () => {
    this.setState({
      action: '',
      ageMin: 18,
      ageMax: 40,
      friendTotalMin: 50,
      friendTotalMax: 1500,
      gender: 'both'
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
  changeAgeRage = value => {
    const ageMin = value[0];
    const ageMax = value[1];
    console.log(ageMin, ageMax);
    this.setState({ ageMin, ageMax });
  };
  changeFollowRage = value => {
    const friendTotalMin = value[0];
    const friendTotalMax = value[1];
    this.setState({ friendTotalMin, friendTotalMax });
  };
  handleChange = event => {
    this.setState({ gender: event.target.value });
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
    //console.log(action, ageMin, ageMax, friendTotalMin, friendTotalMax, gender);
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
    const { open, classes, data, likeState, isVip, t } = this.props;
    const {
      action,
      ageMin,
      ageMax,
      friendTotalMin,
      friendTotalMax,
      gender
    } = this.state;
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
          {t('common:choose_option')}
        </DialogTitle>
        <DialogContent className={classes.likeDialogBody}>
          <div className={classes.likeDiv}>
            <HeartIcon style={{ marginRight: 8 }} />
            <Typography variant="caption">{total_count} ไลค์</Typography>
          </div>
          {likeState === 'init' ? (
            <div>
              {isVip ? (
                <div>
                  <div>
                    <p>
                      {t('common:age_range')}: {ageMin}- {ageMax}{' '}
                      {t('common:age')}
                    </p>
                    <Range
                      allowCross={false}
                      defaultValue={[ageMin, ageMax]}
                      onChange={this.changeAgeRage}
                      min={18}
                      max={40}
                    />
                  </div>
                  <div>
                    <p>
                      {t('common:friend_range')}: {friendTotalMin}-{' '}
                      {friendTotalMax} {t('common:friend')}
                    </p>
                    <Range
                      allowCross={false}
                      defaultValue={[friendTotalMin, friendTotalMax]}
                      onChange={this.changeFollowRage}
                      min={50}
                      max={1500}
                      step={50}
                    />
                  </div>
                  <div style={{ margin: 8 }}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        {t('common:gender')}
                      </FormLabel>
                      <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        value={gender}
                        onChange={this.handleChange}
                        row
                      >
                        <FormControlLabel
                          value="both"
                          control={<Radio />}
                          label={t('common:random')}
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label={t('common:female')}
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label={t('common:male')}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              ) : null}
              {action ? (
                <Typography variant="subtitle2" gutterBottom>
                  {t('common:reaction')} : {action}
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
