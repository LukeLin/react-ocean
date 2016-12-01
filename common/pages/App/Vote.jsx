import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import connectDataFetchers from '../../utils/connectDataFetchers';
import * as ACTIONS from '../../actions/vote';

@connect(function mapStateToProps(state) {
    return {
        message: state.vote.message
    };
})
@connectDataFetchers([ACTIONS.loadData])
class Vote extends Component {
    static pageConfig = {
        pageId: 'Vote'
    };
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

export default Vote;
