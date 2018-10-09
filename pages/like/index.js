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
import delay from '../../lib/delay';

class index extends Component {
  state = {
    accessToken: '',
    fb_accessToken: '',
    countryCode: '',
    config: '',
    locale: '',
    feedData: [],
    paging: {},
    isLoading: true
  };
  async componentDidMount() {
    try {
      const accessToken = localStorage.getItem('popone_accessToken');
      const resCheckLogin = await axios.get(
        `http://localhost:3000/api/users/checkLogin?access_token=${accessToken}`
      );
      const { data: userData } = resCheckLogin.data;
      const { fb_accessToken, countryCode, config, locale } = userData;
      await delay(2000);
      const feedLink = `https://graph.facebook.com/v3.0/me/feed?fields=picture,object_id,from,id,type,link,message,place,privacy&limit=${10}method=get&access_token=${fb_accessToken}`;
      const resFeed = await axios.get(feedLink);
      const { data: feedData, paging } = resFeed.data;
      //console.log(paging);
      this.setState({
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
      const feedLink = `https://graph.facebook.com/v3.0/me/feed?fields=picture,object_id,from,id,type,link,message,place,privacy&limit=${10}method=get&access_token=${fb_accessToken}`;
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
  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <SwitchPage classes={classes} Type={'like'} />
        </Paper>
        <Paper className={classes.paper}>
          <ProfileHeader />
        </Paper>
        <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.refrechFeed.bind(this)}
          >
            <RefreshIcon style={{ marginRight: 8 }} />
            รีเฟรสหน้าฟีด
          </Button>
        </div>
        {isLoading ? (
          <Spinner size={60} />
        ) : (
          <Fragment>
            <Post />
            <Post />
          </Fragment>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(index);
