import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import classNames from 'classnames/bind';
// import styles from 'css/components/vote';

// const cx = classNames.bind(styles);

class Vote extends Component {

    render() {
        return (
            <div className="vote">
                this is vote
                <Link to="/about">about</Link>
                <Link to="test">test</Link>
            </div>
        );
    }
}

Vote.propTypes = {
};

function mapStateToProps(state) {
    return {
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { })(Vote);
