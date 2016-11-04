import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
// import classNames from 'classnames/bind';
// import styles from 'css/components/about';

// const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
class About extends Component {

    render() {
        return (
            <div className="about">
                this is about page
                <Link to="/vote">vote</Link>
                text: { this.props.text }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        text: state.about
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { })(About);
