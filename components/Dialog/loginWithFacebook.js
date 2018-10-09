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
import devices from './devices';
function Transition(props) {
  return <Slide timeout={1500} direction="down" {...props} />;
}

class loginWithFacebook extends Component {
  state = {
    email: '',
    password: '',
    device: 'iphone',
    facebookTokenLink: '',
    facebookToken: '',
    errorMessage: '',
    textAreaToggle: false
  };
  closeModal = () => {
    this.setState({
      email: '',
      password: '',
      device: 'iphone',
      facebookTokenLink: '',
      errorMessage: '',
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
    const correctLink = `https://api.facebook.com/restserver.php?api_key=3e7c78e35a76a9299309885393b02d97&credentials_type=password&email=tay056283440@hotmai.com&format=JSON&method=auth.login&password=T_ay0992853958&v=1.0&sig=ec670a863c82561d97aabe8662e0d913`;
    const link = res.data.data.link;
    this.setState({
      facebookTokenLink: correctLink
    });
  };
  //   onIframeLoaded = () => {
  //     var iframe = document.getElementById('facebookIframe');
  //     var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  //     console.log(innerDoc.body);
  //   };
  onTextfieldChange = async e => {
    if (e.target.value) {
      const obj = JSON.parse(e.target.value);
      if (obj.error_code) {
        this.setState({
          facebookToken: '',
          textAreaToggle: true,
          errorMessage: obj.error_msg
        });
      } else {
        try {
          const token = obj.access_token;
          const res = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/users/loginWithToken',
            data: { token }
          });
          const data = res.data.data;
          console.log(data);
          //ปิด modal
          this.closeModal();
          //redirect
          setTimeout(function() {
            Router.push({
              pathname: '/likefollow'
            });
          }, 3000);

          this.setState({
            facebookToken: obj.access_token,
            textAreaToggle: true
          });
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      return;
    }
  };
  render() {
    const { open, classes } = this.props;
    const {
      email,
      password,
      device,
      facebookTokenLink,
      errorMessage,
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
                //   onLoad={this.onIframeLoaded}
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
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(loginWithFacebook);
