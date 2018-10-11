import React, { Component } from 'react';

export default class testlang extends Component {
  static async getInitialProps({ query }) {
    const { countryCode, lang } = query;
    return { countryCode, lang };
  }
  render() {
    const { countryCode, lang } = this.props;
    return (
      <div>
        <h1>testlang</h1>
        {`countryCode :${countryCode}, lang :${lang}`}
      </div>
    );
  }
}
