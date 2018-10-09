import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkLogin from '../action/authentication/checkLogin';
import Spinner from '../components/UI/spinner';
const checkLoginHOC = WrappedComponent => {
  class ComponentCheckLogin extends Component {
    componentWillMount() {
      this.props.checkLogin();
    }
    render() {
      const { value, isLoading } = this.props;
      return (
        <div>
          {isLoading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <WrappedComponent {...this.props} />
          )}
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    const { isLoading } = state.authentication;
    return { isLoading };
  };
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({ checkLogin }, dispatch);
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ComponentCheckLogin);
};

export default checkLoginHOC;
