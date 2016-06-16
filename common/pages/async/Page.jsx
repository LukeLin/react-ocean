import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {selectReddit, fetchPostsIfNeeded, invalidateReddit} from './actions'
import Picker from '../../components/async/Picker.jsx'
import Posts from '../../components/async/Posts.jsx'
import Base from '../Base.jsx';

class AsyncPage extends Base {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch, selectedReddit} = this.props
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const {dispatch, selectedReddit} = nextProps
            dispatch(fetchPostsIfNeeded(selectedReddit))
        }
    }

    onHandleChange(nextReddit) {
        this.props.dispatch(selectReddit(nextReddit))
    }

    onHandleRefreshClick(e) {
        e.preventDefault()

        const {dispatch, selectedReddit} = this.props
        dispatch(invalidateReddit(selectedReddit))
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    render() {
        const {selectedReddit, posts, isFetching, lastUpdated} = this.props
        const isEmpty = posts.size === 0
        return (
            <div>
                <Picker value={selectedReddit}
                        onChange={this.onHandleChange}
                        options={ defaultOptions }/>
                <p>
                    {
                        lastUpdated ? (
                            <span>
                Last updated at {new Date(lastUpdated).toLocaleTimeString('en-US', {
                                hour12: false
                            })}.
                                {' '}
              </span>
                        ) : ''
                    }
                    {!isFetching &&
                    <a href="#"
                       onClick={this.onHandleRefreshClick}>
                        Refresh
                    </a>
                    }
                </p>
                {isEmpty
                    ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts}/>
                </div>
                }
            </div>
        )
    }
}
AsyncPage.defaultProps = {
    selectedReddit: '',
    posts: new Immutable.List(),
    isFetching: false,
    lastUpdated: 0

};
AsyncPage.propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: ImmutablePropTypes.list.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
}

const defaultOptions = ['reactjs', 'frontend'];

function mapStateToProps(state) {
    const selectedReddit = state.get('selectedReddit');
    const postsByReddit = state.get('postsByReddit');
    const data = postsByReddit.get(state.get('selectedReddit')) || new Immutable.Map({
            isFetching: true,
            items: new Immutable.List()
        });
    const isFetching = data.get('isFetching');
    const lastUpdated = data.get('lastUpdated');
    const posts = data.get('items');

    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncPage)
