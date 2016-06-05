import React, { PropTypes, Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes';
import Base from '../../pages/Base';

export default class Posts extends Base {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>{post.get('title')}</li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: ImmutablePropTypes.list.isRequired
}