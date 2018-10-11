import React from 'react';
import App, { Container } from 'next/app';
import { I18nextProvider } from 'react-i18next';
import initialI18nInstance from '../i18n';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../src/getPageContext';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const { i18n, initialI18nStore, initialLanguage } = pageProps || {};

    return (
      // <Container>
      //   <I18nextProvider
      //     i18n={i18n || initialI18nInstance}
      //     initialI18nStore={initialI18nStore}
      //     initialLanguage={initialLanguage}
      //   >
      //     <React.Fragment>
      //       <Component {...pageProps} />
      //     </React.Fragment>
      //   </I18nextProvider>
      // </Container>
      <Container>
        <Provider store={reduxStore}>
          {/* <Component {...pageProps} /> */}
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
              <I18nextProvider
                i18n={i18n || initialI18nInstance}
                initialI18nStore={initialI18nStore}
                initialLanguage={initialLanguage}
              >
                <Component pageContext={this.pageContext} {...pageProps} />
              </I18nextProvider>
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    );
  }
}
export default withReduxStore(MyApp);
