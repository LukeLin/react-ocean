import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


class About extends Component {

    render() {
        return (
            <div className="about">
                this is about page
                <Link to="/vote?debug=test">vote</Link>
                text: {this.props.text}
            </div>
        );
    }
}
About.pageConfig = {
    pageId: 'About'
};

function mapStateToProps(state) {
    return {
        text: state.about
    };
}

export default connect(mapStateToProps)(About);
