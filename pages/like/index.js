import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import styles from './styles';

import ProfileHeader from '../../components/ProfileHeader';
import SwitchPage from '../../components/UI/switchPage';
import Spinner from '../../components/UI/spinner';
import Post from '../../components/Post';
import LikePost from '../../components/Dialog/likePost';
import delay from '../../lib/delay';
import {
  createFeedLink,
  createProfileLink,
  createPostSumary
} from '../../lib/createFacebookLink';
import {
  createCheckLogin,
  createLikePost,
  createSwitchAuto
} from '../../lib/createMyApiLink';

class index extends Component {
  state = {
    name: '',
    profilePicture: '',
    accessToken: '',
    fb_accessToken: '',
    countryCode: '',
    config: '',
    locale: '',
    feedData: [],
    paging: {},
    isLoading: true,
    openModal: false,
    postIndex: 0,
    likeState: 'init',
    lastUpdated: '',
    canLike: false,
    isVip: false,
    nextTime: '',
    auto: 0,
    vip_date: '',
    delay_sec: 0,
    diffVipTime_sec: 0,
    countDown: 0
  };
  async componentDidMount() {
    try {
      const accessToken = localStorage.getItem('popone_accessToken');
      if (!accessToken) {
        Router.push({
          pathname: '/'
        });
      }
      const resCheckLogin = await axios.get(createCheckLogin(accessToken));
      console.log(accessToken);
      //onsole.log(resCheckLogin.data);
      const { data: userData } = resCheckLogin.data;
      const { fb_accessToken, countryCode, config, locale } = userData;
      const { lastUpdated, delay: actionDelay, auto, vip_date } = config.like;
      const current_Date = new Date();
      const last_used = new Date(lastUpdated);
      const diffTime_sec = (current_Date - last_used) / 1000;
      let canLike = false;
      let nextTime = '';
      const delay_sec = actionDelay - diffTime_sec;
      console.log(`diffTime_sec: ${diffTime_sec}`);
      console.log(`delay_sec: ${delay_sec}`);
      if (delay_sec > 0) {
        canLike = false;
        const testDelay = actionDelay * 1000;
        const temp2 = new Date(last_used.getTime() + testDelay);
        nextTime = temp2.toISOString();
        this.setState({ countDown: delay_sec });

        let countDownF = setInterval(() => {
          let { countDown } = this.state;
          if (countDown > 0) {
            countDown = countDown - 1;
            this.setState({ countDown });
          } else {
            clearInterval(countDownF);
          }
        }, 1000);

        setTimeout(() => {
          console.log('ถึงเวลา กด like ได้แล้ว');
          const nowDate = new Date();
          this.setState({ canLike: true, nextTime: nowDate.toISOString() });
        }, delay_sec * 1000);
      } else {
        const nowDate = new Date();
        nextTime = nowDate.toISOString();
        canLike = true;
      }
      console.log(canLike, nextTime);
      //-------------check vip------------------
      const vipDate = new Date(vip_date);
      const diffVipTime_sec = (vipDate - current_Date) / 1000;
      console.log(`diffVipTime_sec : ${diffVipTime_sec}`);
      let isVip = false;
      if (diffVipTime_sec > 0) {
        isVip = true;
      } else {
        isVip = false;
      }
      //----------------------------------------------
      await delay(2000);
      const profileLink = createProfileLink(fb_accessToken);
      const resProfile = await axios.get(profileLink);
      const { picture: profilePicture, name } = resProfile.data;
      const feedLink = createFeedLink(fb_accessToken);
      const resFeed = await axios.get(feedLink);
      const { data: feedData, paging } = resFeed.data;
      console.log(`fb_accessToken: ${fb_accessToken}`);
      this.setState({
        name,
        profilePicture,
        accessToken,
        fb_accessToken,
        countryCode,
        config,
        locale,
        feedData,
        paging,
        isLoading: false,
        likeState: 'init',
        lastUpdated,
        canLike,
        isVip,
        auto,
        nextTime: nextTime,
        vip_date,
        delay_sec,
        diffVipTime_sec
      });
    } catch (e) {
      console.log(e);
    }
  }
  refrechFeed = async () => {
    try {
      this.setState({
        feedData,
        paging,
        isLoading: true
      });
      await delay(2000);
      const { fb_accessToken } = this.state;
      const feedLink = createFeedLink(fb_accessToken);
      const resFeed = await axios.get(feedLink);
      const { data: feedData, paging } = resFeed.data;
      this.setState({
        feedData,
        paging,
        isLoading: false
      });
    } catch (e) {
      console.log(e);
    }
  };
  onOpenPopUp = index => {
    //alert(index);
    this.setState({
      openModal: true,
      postIndex: index
    });
  };
  onClosePopUp = () => {
    this.setState({
      openModal: false,
      postIndex: 0,
      likeState: 'init'
    });
  };
  onPumpLike = async (
    action,
    ageMin,
    ageMax,
    friendTotalMin,
    friendTotalMax,
    gender
  ) => {
    //console.log(action, ageMin, ageMax, friendTotalMin, friendTotalMax, gender);
    try {
      const {
        postIndex,
        feedData,
        fb_accessToken,
        config,
        accessToken
      } = this.state;
      const currentPost = feedData[postIndex];
      const { id, reactions } = currentPost;
      let { total_count } = reactions.summary;
      const { delay: actionDelay } = config.like;

      this.setState({ likeState: 'process' });
      const inteval = setInterval(async () => {
        let { feedData } = this.state;
        const res = await axios.get(createPostSumary(id, fb_accessToken));
        // ใช้จริง
        const new_total_count = res.data.summary.total_count;
        feedData[postIndex].reactions.summary.total_count = new_total_count;
        //total_count = total_count + 5;
        //feedData[postIndex].reactions.summary.total_count = total_count;
        this.setState({ feedData: feedData });
      }, 5000);
      await delay(2000);
      // -------------- like ของจริง -------------------------------------------
      const link = createLikePost(accessToken);
      const res = await axios({
        method: 'post',
        url: link,
        data: {
          postId: id,
          action,
          ageMin,
          ageMax,
          friendTotalMin,
          friendTotalMax,
          gender
        }
      });
      const data = res.data.data;
      console.log(data);
      //-----------------------------------------------------------------------
      clearInterval(inteval);
      const nowDate = new Date();
      const lastUpdated = nowDate.toISOString();
      const testDelay = actionDelay * 1000;
      const temp2 = new Date(nowDate.getTime() + testDelay);
      const nextTime = temp2.toISOString();

      this.setState({ countDown: actionDelay });
      let countDownF = setInterval(() => {
        let { countDown } = this.state;
        if (countDown > 0) {
          countDown = countDown - 1;
          this.setState({ countDown });
        } else {
          clearInterval(countDownF);
        }
      }, 1000);

      setTimeout(() => {
        console.log('ถึงเวลา กด like ได้แล้ว');
        const nowDate = new Date();
        this.setState({ canLike: true, nextTime: nowDate.toISOString() });
      }, actionDelay * 1000);
      this.setState({
        likeState: 'done',
        nextTime,
        lastUpdated,
        canLike: false
      });
      console.log('ครบ 20 วินาที');
    } catch (e) {
      console.log(e);
    }
  };
  onClickSwitch = async () => {
    try {
      const { auto, accessToken } = this.state;
      const newAuto = auto === 1 ? 0 : 1;
      const link = createSwitchAuto(accessToken);
      const res = await axios({
        method: 'post',
        url: link,
        data: { type: 'like' }
      });
      this.setState({ auto: newAuto });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { classes } = this.props;
    const {
      isLoading,
      feedData,
      name,
      profilePicture,
      openModal,
      postIndex,
      likeState,
      canLike,
      isVip,
      auto,
      lastUpdated,
      nextTime,
      vip_date,
      delay_sec,
      diffVipTime_sec,
      countDown
    } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <SwitchPage classes={classes} Type={'like'} isLoading={isLoading} />
        </Paper>
        <Paper className={classes.paper}>
          <ProfileHeader
            isLoading={isLoading}
            name={name}
            profilePicture={profilePicture}
            type={'like'}
            auto={auto}
            onClickSwitch={this.onClickSwitch.bind(this)}
            nextTime={nextTime}
            lastUpdated={lastUpdated}
            delay_sec={delay_sec}
            diffVipTime_sec={diffVipTime_sec}
            vip_date={vip_date}
            isVip={isVip}
            countDown={countDown}
          />
        </Paper>
        <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.refrechFeed.bind(this)}
            disabled={isLoading ? Boolean(true) : Boolean(false)}
          >
            <RefreshIcon style={{ marginRight: 8 }} />
            รีเฟรสหน้าฟีด
          </Button>
        </div>
        {isLoading ? (
          <Spinner size={60} />
        ) : (
          <Fragment>
            {feedData.map((data, index) => {
              return (
                <Post
                  key={`post-${data.id}`}
                  profilePicture={profilePicture}
                  data={data}
                  index={index}
                  onOpenPopUp={this.onOpenPopUp.bind(this)}
                  canLike={canLike}
                />
              );
            })}
          </Fragment>
        )}
        <LikePost
          open={openModal}
          likeState={likeState}
          data={feedData[postIndex]}
          closeModal={this.onClosePopUp.bind(this)}
          onPumpLike={this.onPumpLike.bind(this)}
          isVip={isVip}
        />
      </div>
    );
  }
}

export default withStyles(styles)(index);
