import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import connectDataFetchers from '../../utils/connectDataFetchers';
import * as ACTIONS from './actions/Vote';

class Vote extends Component {
    render() {
        return (
            <div className="vote">
                this is vote
                <Link to="/about?debug=test">about</Link>
                <Link to="/test">test</Link>
                message: { this.props.message }
            </div>
        );
    }
}
Vote.pageConfig = {
    pageId: 'Vote'
};

export default connect(function mapStateToProps(state) {
    return {
        message: state.vote.message
    };
})(connectDataFetchers(Vote, [ACTIONS.loadData]));
