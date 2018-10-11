import Router from 'next/router';
import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { Grid, Button } from '@material-ui/core';
import SettingIcon from '@material-ui/icons/SettingsOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { withStyles } from '@material-ui/core/styles';
import { withI18next } from '../../lib/withI18next';
import styles from './styles';
import IndexHeader from '../../components/UI/indexHeader';
import Footer from '../../components/UI/footer';
import LoginWithFacebook from '../../components/Dialog/loginWithFacebook';
import LoginWihtToken from '../../components/Dialog/loginWihtToken';
import i18n from '../../i18n';

class index extends Component {
  state = {
    isRender: false,
    openUser: false,
    openToken: false
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
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isRender: true });
    }, 1500);
  }
  openEnableFacebook = () => {
    window.open('https://www.facebook.com/settings?tab=privacy', '_blank');
  };
  handleClickOpenUser = () => {
    this.setState({ openUser: true });
  };
  handleCloseUser = () => {
    this.setState({ openUser: false });
  };
  handleClickOpenToken = () => {
    this.setState({ openToken: true });
  };
  handleCloseToken = () => {
    this.setState({ openToken: false });
  };
  render() {
    const { t, classes, country, language } = this.props;
    const { isRender } = this.state;
    return (
      <Fragment>
        {isRender ? (
          <div className={classes.root}>
            <Grid container className={classes.indexContainer} spacing={16}>
              <IndexHeader classes={classes} />
              <Grid item xs={12}>
                <div className={classes.indexContent}>
                  <div className={classNames(classes.alertDiv, classes.green)}>
                    <SettingIcon style={{ fontSize: 30 }} />
                    <p>{t('1box')}</p>
                  </div>
                  <div className={classes.btnDiv}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={this.handleClickOpenUser}
                    >
                      {t('modal_username')}
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={this.handleClickOpenToken}
                    >
                      {t('modal_token')}
                    </Button>
                  </div>
                  <div className={classNames(classes.alertDiv, classes.blue)}>
                    <InfoIcon style={{ fontSize: 30 }} />
                    <p>
                      {t('2box')}{' '}
                      <span
                        onClick={this.openEnableFacebook}
                        className={classes.link}
                      >
                        {t('2box_underline')}
                      </span>
                    </p>
                  </div>
                  <div className={classNames(classes.alertDiv, classes.red)}>
                    <InfoIcon style={{ fontSize: 30 }} />
                    <p>{t('3box')}</p>
                  </div>
                </div>
              </Grid>
              <Footer classes={classes} />
            </Grid>
            {String(this.state.open)}
            <LoginWithFacebook
              open={this.state.openUser}
              handleClose={this.handleCloseUser.bind(this)}
              t={t}
              country={country}
              language={language}
            />
            <LoginWihtToken
              open={this.state.openToken}
              handleClose={this.handleCloseToken.bind(this)}
              t={t}
              country={country}
              language={language}
            />
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(withI18next(['index'])(index));
