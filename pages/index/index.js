import React, { Component } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

import SettingIcon from '@material-ui/icons/SettingsOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AccontIcon from '@material-ui/icons/AccountCircleOutlined';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import styles from './styles';
import { addNumber, subNumber } from '../../action';
import IndexHeader from '../../components/UI/indexHeader';
import Footer from '../../components/UI/footer';
import LoginWithFacebook from '../../components/Dialog/loginWithFacebook';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class index extends Component {
  state = {
    open: true
  };
  openEnableFacebook = () => {
    window.open('https://www.facebook.com/settings?tab=privacy', '_blank');
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { value, addNumber, subNumber, classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.indexContainer} spacing={16}>
          <IndexHeader classes={classes} />
          <Grid item xs={12}>
            <div className={classes.indexContent}>
              <div className={classNames(classes.alertDiv, classes.green)}>
                <SettingIcon style={{ fontSize: 30 }} />
                <p>
                  Free User สามารถปั้มได้ 40 / VIP User สามารถปั้มได้ 300 ต่อ 1
                  รอบ
                </p>
              </div>
              <div className={classes.btnDiv}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={this.handleClickOpen}
                >
                  เข้าสู่ระบบด้วย Facebook
                </Button>
                <Button fullWidth variant="outlined">
                  เข้าสู่ระบบด้วย Token
                </Button>
              </div>
              <div className={classNames(classes.alertDiv, classes.blue)}>
                <InfoIcon style={{ fontSize: 30 }} />
                <p>
                  อย่าลืมตรวจสอบว่าคุณได้เปิดผู้ติดตามโดยต้องตั้งค่าในเฟสให้มีอายุ
                  18 ปีขึ้นไปถึงจะเปิดได้
                  และได้ตั้งโพสต์ที่ต้องการเพิ่มไลค์เป็นสาธารณะแล้ว{' '}
                  <span
                    onClick={this.openEnableFacebook}
                    className={classes.link}
                  >
                    เปิดผู้ติดตามคลิกที่นี้
                  </span>
                </p>
              </div>
              <div className={classNames(classes.alertDiv, classes.red)}>
                <InfoIcon style={{ fontSize: 30 }} />
                <p>
                  คำเตือน :
                  เว็บนี้เป็นเพียงสื่อกลางในการแลกเปลี่ยนไลค์ซึ่งกันและกัน
                  เขาไลค์ให้คุณ คุณก็จะไลค์ให้เขา
                </p>
              </div>
            </div>
          </Grid>
          <Footer classes={classes} />
        </Grid>
        {String(this.state.open)}
        <LoginWithFacebook
          open={this.state.open}
          handleClose={this.handleClose.bind(this)}
        />
        {/* <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { counter } = state;
  const { value } = counter;
  return { value };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addNumber, subNumber }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(index));
