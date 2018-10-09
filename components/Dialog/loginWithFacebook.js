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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles';
import devices from './devices';
import loginWithToken from '../../action/authentication/loginWithToken';
function Transition(props) {
  return <Slide timeout={1500} direction="down" {...props} />;
}

class loginWithFacebook extends Component {
  state = {
    email: 'tay056283440@hotmail.com',
    password: 'T_ay02061992',
    device: 'iphone',
    facebookTokenLink: '',
    facebookToken: '',
    textAreaToggle: false
  };
  closeModal = () => {
    this.setState({
      email: '',
      password: '',
      device: 'iphone',
      facebookTokenLink: '',
      facebookToken: '',
      textAreaToggle: false
    });
    this.props.handleClose();
  };
  setValue = (e, name) => {
    this.setState({ [name]: e.target.value });
  };
  getFacebookeTokenLink = async () => {
    const { email, password, device } = this.state;
    // alert(`${email} - ${password} - ${device}`);
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/createGetFacebookTokenLink',
      data: {
        email,
        password,
        device
      }
    });
    const link = res.data.data.link;
    console.log(link);
    this.setState({
      facebookTokenLink: link
    });
  };
  onIframeLoaded = () => {
    var iframe = document.getElementById('facebookIframe');
    var elmnt = iframe.contentWindow.document.getElementsByTagName('body');
    console.log(elmnt);
  };
  onTextfieldChange = async e => {
    if (e.target.value) {
      try {
        const obj = JSON.parse(e.target.value);
        if (obj.error_code) {
          this.setState({
            facebookToken: '',
            textAreaToggle: true
          });
        } else {
          this.props.loginWithToken(
            obj.access_token,
            this.closeModal.bind(this)
          );
          this.setState({
            facebookToken: obj.access_token,
            textAreaToggle: true
          });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      return;
    }
  };
  render() {
    const { open, classes, isLoading, errorMessage } = this.props;
    const {
      email,
      password,
      device,
      facebookTokenLink,
      facebookToken,
      textAreaToggle
    } = this.state;
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
          {'ล็อคอิน Facebook ของท่าน'}
        </DialogTitle>
        <DialogContent className={classes.dialogBody}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email or Telephone No."
            type="text"
            fullWidth
            value={email}
            onChange={e => this.setValue(e, 'email')}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={e => this.setValue(e, 'password')}
          />
          <TextField
            id="device"
            select
            label="Select"
            value={device}
            onChange={e => this.setValue(e, 'device')}
            helperText="Please select your device"
            margin="normal"
            fullWidth
          >
            {devices.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {facebookTokenLink ? (
            <Fragment>
              <iframe
                style={{ width: '100%' }}
                id="facebookIframe"
                // onLoad={this.onIframeLoaded}
                src={facebookTokenLink}
              />
              <TextField
                onChange={e => this.onTextfieldChange(e)}
                id="jsonValue"
                // label="Multiline"
                multiline
                rows="4"
                margin="normal"
                fullWidth
                error={
                  (facebookToken === '' &&
                    facebookTokenLink !== '' &&
                    textAreaToggle) ||
                  errorMessage
                    ? Boolean(true)
                    : Boolean(false)
                }
                helperText={errorMessage}
              />
            </Fragment>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.getFacebookeTokenLink.bind(this)}
            color="primary"
            disabled={errorMessage ? Boolean(true) : Boolean(false)}
          >
            Generate Token
          </Button>
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
)(withStyles(styles)(loginWithFacebook));
