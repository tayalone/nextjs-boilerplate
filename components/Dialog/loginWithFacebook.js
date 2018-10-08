import React, { Component } from 'react';
import {
  Button,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class loginWithFacebook extends Component {
  state = {
    email: '',
    password: ''
  };
  closeModal = () => {
    this.setState({
      email: '',
      password: ''
    });
    this.props.handleClose();
  };
  setValue = (e, name) => {
    this.setState({ [name]: e.target.value });
  };
  getFacebookeTokenLink = () => {
    const { email, password } = this.state;
    alert(`${email} - ${password}`);
  };
  render() {
    const { open, classes } = this.props;
    const { email, password } = this.state;
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
