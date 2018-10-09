import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const checkLogin = WrappedComponent => {
  class ComponentCheckLogin extends Component {
    render() {
      const { value } = this.props;
      return <WrappedComponent parentValue={value} />;
    }
  }
  const mapStateToProps = state => {
    const { counter } = state;
    const { value } = counter;
    return { value };
  };
  return connect(mapStateToProps)(ComponentCheckLogin);
};

export default checkLogin;
