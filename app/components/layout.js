import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import Navbar from './navbar';
require("../styles/application.css");

export default class Layout extends PureComponent {
  render () {
    const { children } = this.props;

    return (
      <div className="panel-container">
        <Navbar />
        <div className="container-fluid">

          <div className="main-area">
            <div className="content">

              {children || this.renderAssistanceQuestion()}

            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAssistanceQuestion () {
    return (
      <p><i className="fa fa-hand-o-left" /> This is the homepage! Blah Blah</p>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object,
};
