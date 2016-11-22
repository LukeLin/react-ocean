import React, {PropTypes} from 'react';
import Base from '../pages/Base';

let IS_FIRST_MOUNT_AFTER_LOAD = true;

export default function connectDataFetchers(Component, actionCreators, cache) {
    if(process.browser){
        if(!Component.pageConfig) {
            console.error(`Page Component static propery pageConfig.pageId required!`);
        } else {
            IS_FIRST_MOUNT_AFTER_LOAD = Component.pageConfig.pageId === window.__APP_CONFIG__.pageId;;
        }
    }

    class DataFetchersWrapper extends Base {
        static fetchData({dispatch, location, params, appConfig, pageConfig}, req) {
            return Promise.all(
                actionCreators.map(actionCreator => dispatch(actionCreator({dispatch, location, params, appConfig, pageConfig}, req)))
            );
        }

        shouldComponentUpdate(nextProps){
            return this.props !== nextProps;
        }

        componentDidUpdate(prevProps) {
            const {location} = this.props;
            const {location: prevLocation} = prevProps;

            const isUrlChanged = (location.pathname !== prevLocation.pathname)
                || (location.search.slice(1) !== prevLocation.search.slice(1));

            if (isUrlChanged) {
                this._fetchDataOnClient();
            }
        }

        componentDidMount() {
            if(!cache) {
                if (!IS_FIRST_MOUNT_AFTER_LOAD) {
                    this._fetchDataOnClient();
                }

                IS_FIRST_MOUNT_AFTER_LOAD = false;
            } else {
                if (!IS_FIRST_MOUNT_AFTER_LOAD && !Component.DATA_LOADED) {
                    this._fetchDataOnClient();
                }

                Component.DATA_LOADED = true;
                IS_FIRST_MOUNT_AFTER_LOAD = false;
            }
        }

        _fetchDataOnClient() {
            this.constructor.fetchData({
                dispatch: this.props.dispatch,
                params: this.props.params,
                location: this.props.location,
                appConfig: this.context.$appConfig
            });
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    }

    DataFetchersWrapper.propTypes = {
        dispatch: PropTypes.func.isRequired,
        params: PropTypes.object,
        location: PropTypes.shape({
            pathname: PropTypes.string.required,
            search: PropTypes.string,
            query: PropTypes.string.object
        }).isRequired
    };

    DataFetchersWrapper.contextTypes = {
        $appConfig: PropTypes.object
    };

    DataFetchersWrapper.OriginalPage = Component;

    return DataFetchersWrapper;
}
