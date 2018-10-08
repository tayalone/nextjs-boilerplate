import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNumber, subNumber } from '../../action';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import IndexHeader from '../../components/UI/indexHeader';
import Footer from '../../components/UI/footer';
import styles from './styles';

class index extends Component {
  render() {
    const { value, addNumber, subNumber, classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.indexContainer} spacing={16}>
          <IndexHeader classes={classes} />
          <Grid item xs={12}>
            {/* <Paper className={classes.paper}>xs=12</Paper> */}
            <div className={classes.indexContent}>
              <p>
                Free User สามารถปั้มได้ 40 / VIP User สามารถปั้มได้ 300 ต่อ 1
                รอบ
              </p>
              <p>
                อย่าลืมตรวจสอบว่าคุณได้เปิดผู้ติดตามโดยต้องตั้งค่าในเฟสให้มีอายุ
                18 ปีขึ้นไปถึงจะเปิดได้
                และได้ตั้งโพสต์ที่ต้องการเพิ่มไลค์เป็นสาธารณะแล้ว
              </p>
              <p>
                คำเตือน :
                เว็บนี้เป็นเพียงสื่อกลางในการแลกเปลี่ยนไลค์ซึ่งกันและกัน
                เขาไลค์ให้คุณ คุณก็จะไลค์ให้เขา
              </p>
            </div>
          </Grid>
          <Footer classes={classes} />
        </Grid>
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
