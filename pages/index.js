import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNumber, subNumber } from '../action';
class index extends Component {
  render() {
    const { value, addNumber, subNumber } = this.props;
    return (
      <div>
        <h1>Index</h1>
        <p> {value}</p>
        <button onClick={addNumber}>add</button>
        <button onClick={subNumber}>sub</button>
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
)(index);
