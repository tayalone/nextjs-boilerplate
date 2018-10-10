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
  createProfileLink
} from '../../lib/createFacebookLink';
import { createCheckLogin } from '../../lib/createMyApiLink';

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
    openModal: true,
    postIndex: 4
  };
  async componentDidMount() {
    try {
      const accessToken = localStorage.getItem('popone_accessToken');
      const resCheckLogin = await axios.get(createCheckLogin(accessToken));
      const { data: userData } = resCheckLogin.data;
      const { fb_accessToken, countryCode, config, locale } = userData;
      await delay(2000);
      const profileLink = createProfileLink(fb_accessToken);
      const resProfile = await axios.get(profileLink);
      const { picture: profilePicture, name } = resProfile.data;
      const feedLink = createFeedLink(fb_accessToken);
      const resFeed = await axios.get(feedLink);
      const { data: feedData, paging } = resFeed.data;
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
        isLoading: false
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
      postIndex: -1
    });
  };
  render() {
    const { classes } = this.props;
    const {
      isLoading,
      feedData,
      name,
      profilePicture,
      openModal,
      postIndex
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
                />
              );
            })}
          </Fragment>
        )}
        <LikePost open={openModal} closeModal={this.onClosePopUp.bind(this)} />
      </div>
    );
  }
}

export default withStyles(styles)(index);
