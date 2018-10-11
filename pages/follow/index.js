import React, { Component, Fragment } from 'react';
import { withI18next } from '../../lib/withI18next';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from '../like/styles';

import ProfileHeader from '../../components/ProfileHeader';
import SwitchPage from '../../components/UI/switchPage';
import Spinner from '../../components/UI/spinner';
import delay from '../../lib/delay';

import Slider from 'rc-slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
import { createProfileLink } from '../../lib/createFacebookLink';
import {
  createCheckLogin,
  createFollowUser,
  createSwitchAuto
} from '../../lib/createMyApiLink';
import i18n from '../../i18n';

class index extends Component {
  state = {
    isRender: false,
    name: '',
    profilePicture: '',
    accessToken: '',
    fb_accessToken: '',
    countryCode: '',
    config: '',
    locale: '',
    isLoading: true,
    postIndex: 0,
    followState: 'init',
    lastUpdated: '',
    canFollow: false,
    isVip: false,
    nextTime: '',
    auto: 0,
    ageMin: 18,
    ageMax: 40,
    friendTotalMin: 50,
    friendTotalMax: 1500,
    gender: 'both',
    delay_sec: 0,
    diffVipTime_sec: 0,
    vip_date: ''
  };
  static async getInitialProps({ query }) {
    const { country, language } = query;
    //console.log(query);
    return { country, language };
  }
  componentWillMount() {
    const { language } = this.props;
    //console.log(language);
    i18n.changeLanguage(language);
  }
  async componentDidMount() {
    setTimeout(() => {
      this.setState({ isRender: true });
    }, 1500);
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
      console.log(config);
      const { lastUpdated, delay: actionDelay, auto, vip_date } = config.follow;
      const current_Date = new Date();
      const last_used = new Date(lastUpdated);
      const diffTime_sec = (current_Date - last_used) / 1000;
      let canFollow = false;
      let nextTime = '';
      const delay_sec = actionDelay - diffTime_sec;
      console.log(`diffTime_sec: ${diffTime_sec}`);
      console.log(`delay_sec: ${delay_sec}`);
      if (delay_sec > 0) {
        canFollow = false;
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
          console.log('ถึงเวลา กด follow ได้แล้ว');
          const nowDate = new Date();
          this.setState({ canFollow: true, nextTime: nowDate.toISOString() });
        }, delay_sec * 1000);
      } else {
        const nowDate = new Date();
        nextTime = nowDate.toISOString();
        canFollow = true;
      }
      console.log(canFollow, nextTime);
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
      console.log(`fb_accessToken: ${fb_accessToken}`);
      this.setState({
        name,
        profilePicture,
        accessToken,
        fb_accessToken,
        countryCode,
        config,
        locale,
        isLoading: false,
        followState: 'init',
        lastUpdated,
        canFollow,
        isVip,
        auto,
        nextTime: nextTime,
        delay_sec,
        diffVipTime_sec,
        vip_date
      });
    } catch (e) {
      console.log(e);
    }
  }
  onFollowUse = async () => {
    const {
      config,
      accessToken,
      ageMin,
      ageMax,
      friendTotalMin,
      friendTotalMax,
      gender
    } = this.state;
    try {
      const {
        config,
        accessToken,
        ageMin,
        ageMax,
        friendTotalMin,
        friendTotalMax,
        gender
      } = this.state;

      const { delay: actionDelay } = config.follow;
      this.setState({ followState: 'process' });
      await delay(2000);
      // -------------- like ของจริง -------------------------------------------
      const link = createFollowUser(accessToken);
      const res = await axios({
        method: 'post',
        url: link,
        data: {
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
        this.setState({ canFollow: true, nextTime: nowDate.toISOString() });
      }, actionDelay * 1000);
      this.setState({
        followState: 'done',
        nextTime,
        lastUpdated,
        canFollow: false
      });
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
        data: { type: 'follow' }
      });
      console.log(res.data);
      this.setState({ auto: newAuto });
    } catch (e) {
      console.log(e);
    }
  };
  changeAgeRage = value => {
    const ageMin = value[0];
    const ageMax = value[1];
    console.log(ageMin, ageMax);
    this.setState({ ageMin, ageMax });
  };
  changeFollowRage = value => {
    const friendTotalMin = value[0];
    const friendTotalMax = value[1];
    this.setState({ friendTotalMin, friendTotalMax });
  };
  handleChange = event => {
    this.setState({ gender: event.target.value });
  };
  render() {
    const { t, classes, country, language } = this.props;
    const {
      isRender,
      isLoading,
      name,
      profilePicture,
      followState,
      canFollow,
      auto,
      ageMin,
      ageMax,
      friendTotalMin,
      friendTotalMax,
      gender,
      isVip,
      nextTime,
      lastUpdated,
      delay_sec,
      diffVipTime_sec,
      vip_date,
      countDown
    } = this.state;
    return (
      <Fragment>
        {isRender ? (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <SwitchPage
                classes={classes}
                Type={'follow'}
                isLoading={isLoading}
                country={country}
                language={language}
                t={t}
              />
            </Paper>
            <Paper className={classes.paper}>
              <ProfileHeader
                isLoading={isLoading}
                name={name}
                profilePicture={profilePicture}
                type={'follow'}
                auto={auto}
                onClickSwitch={this.onClickSwitch.bind(this)}
                nextTime={nextTime}
                lastUpdated={lastUpdated}
                delay_sec={delay_sec}
                diffVipTime_sec={diffVipTime_sec}
                vip_date={vip_date}
                isVip={isVip}
                countDown={countDown}
                t={t}
              />
            </Paper>
            {isVip ? (
              <Paper className={classes.paperVIP}>
                <div>
                  <div>
                    <p>
                      {t('common:age_range')}: {ageMin}- {ageMax}{' '}
                      {t('common:age')}
                    </p>
                    <Range
                      allowCross={false}
                      defaultValue={[ageMin, ageMax]}
                      onChange={this.changeAgeRage}
                      min={18}
                      max={40}
                    />
                  </div>
                  <div>
                    <p>
                      {t('common:friend_range')}: {friendTotalMin}-{' '}
                      {friendTotalMax} {t('common:friend')}
                    </p>
                    <Range
                      allowCross={false}
                      defaultValue={[friendTotalMin, friendTotalMax]}
                      onChange={this.changeFollowRage}
                      min={50}
                      max={1500}
                      step={50}
                    />
                  </div>
                  <div style={{ margin: 8 }}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        {t('common:gender')}
                      </FormLabel>
                      <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        value={gender}
                        onChange={this.handleChange}
                        row
                      >
                        <FormControlLabel
                          value="both"
                          control={<Radio />}
                          label={t('common:random')}
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label={t('common:female')}
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label={t('common:male')}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </Paper>
            ) : null}
            <div
              style={{ display: 'flex', justifyContent: 'center', margin: 10 }}
            >
              <Button
                variant="contained"
                className={classes.button}
                onClick={this.onFollowUse.bind(this)}
                disabled={
                  isLoading
                    ? Boolean(true)
                    : !canFollow
                      ? Boolean(true)
                      : Boolean(false)
                }
                color={'secondary'}
              >
                <AccountCircle style={{ marginRight: 8 }} />
                {t('follow_button')}
              </Button>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(withI18next(['follow', 'common'])(index));
