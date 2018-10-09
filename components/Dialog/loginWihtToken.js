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

function Transition(props) {
  return <Slide timeout={1500} direction="down" {...props} />;
}

class loginWihtToken extends Component {
  state = {
    facebookToken: '',
    errorMessage: '',
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
    if (e.target.value) {
      try {
        this.setState({
          facebookToken: token
        });
        const token = e.target.value;
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
      } catch (e) {
        const { message } = e.response.data;
        this.setState({
          errorMessage: message
        });
        console.log(message);
      }
    } else {
      return;
    }
  };
  render() {
    const { open, classes } = this.props;
    const { errorMessage, facebookToken, textAreaToggle } = this.state;
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
            error={errorMessage ? Boolean(true) : Boolean(false)}
            helperText={errorMessage}
            margin="dense"
            id="token"
            label="Facebook Token: "
            type="text"
            fullWidth
            value={facebookToken}
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

export default withStyles(styles)(loginWihtToken);
