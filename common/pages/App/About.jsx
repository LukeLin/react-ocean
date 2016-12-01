import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        text: state.about
    };
}

@connect(mapStateToProps)
class About extends Component {
    static pageConfig = {
        pageId: 'About'
    };

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

export default About;
