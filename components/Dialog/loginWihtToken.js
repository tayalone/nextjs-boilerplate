import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import {
  Button,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import styles from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loginWithToken from '../../action/authentication/loginWithToken';

function Transition(props) {
  return <Slide timeout={1500} direction="down" {...props} />;
}

class loginWihtToken extends Component {
  state = {
    facebookToken: '',
    textAreaToggle: false
  };
  closeModal = () => {
    this.setState({
      errorMessage: '',
      facebookToken: '',
      textAreaToggle: false
    });
    this.props.handleClose();
  };
  onTextfieldChange = async e => {
    const { country, language } = this.props;
    if (e.target.value) {
      this.props.loginWithToken(
        e.target.value,
        this.closeModal.bind(this),
        country,
        language
      );
    } else {
      return;
    }
  };
  render() {
    const { open, classes, isLoading, errorMessage, t } = this.props;
    const { facebookToken, textAreaToggle } = this.state;
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.closeModal.bind(this)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.closeDiv}>
          <IconButton className={classes.button} aria-label="close-modal">
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-slide-title">
          {t('modal_token')}
        </DialogTitle>
        <DialogContent className={classes.dialogBody}>
          <TextField
            autoFocus
            error={errorMessage ? Boolean(true) : Boolean(false)}
            helperText={errorMessage}
            margin="dense"
            id="token"
            label={t('facbook_tokne')}
            type="text"
            fullWidth
            value={t('close_modal')}
            onChange={e => this.onTextfieldChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal.bind(this)} color="secondary">
            Close Modal
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  const { isLoading, errorMessage } = state.authentication;
  return { isLoading, errorMessage };
};
const mapdispatchToProps = dispatch => {
  return bindActionCreators({ loginWithToken }, dispatch);
};

export default connect(
  mapStateToProps,
  mapdispatchToProps
)(withStyles(styles)(loginWihtToken));
