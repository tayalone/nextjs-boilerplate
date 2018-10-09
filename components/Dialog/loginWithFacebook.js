import React, { Component, Fragment } from 'react';
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
  return <Slide direction="down" {...props} />;
}

class loginWithFacebook extends Component {
  state = {
    email: '',
    password: '',
    device: 'iphone',
    facebookToken: ''
  };
  closeModal = () => {
    this.setState({
      email: '',
      password: '',
      device: 'iphone',
      facebookTokenLink: '',
      facebookToken: ''
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
    this.setState({
      facebookTokenLink: 'https://jsonplaceholder.typicode.com/posts'
    });
  };
  //   onIframeLoaded = () => {
  //     var iframe = document.getElementById('facebookIframe');
  //     var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  //     console.log(innerDoc.body);
  //   };
  render() {
    const { open, classes } = this.props;
    const { email, password, device, facebookTokenLink } = this.state;
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
          <IconButton
            className={classes.button}
            aria-label="close-modal"
            onClick={this.closeModal.bind(this)}
          >
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
                id="jsonValue"
                label="Multiline"
                multiline
                rows="4"
                margin="normal"
                fullWidth
              />
            </Fragment>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal.bind(this)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={this.getFacebookeTokenLink.bind(this)}
            color="primary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(loginWithFacebook);
