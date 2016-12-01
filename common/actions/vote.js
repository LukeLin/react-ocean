import fetchList from '../../../fetchList';

export const LOAD_VOTE_SUCCESS = 'LOAD_VOTE_SUCCESS';
export const LOAD_VOTE_FAILED = 'LOAD_VOTE_FAILED';

export function loadData(opts, req){
    return (dispatch) => {
        return fetchList.getVote(opts, req).then((resp) => {
            dispatch({
                type: LOAD_VOTE_SUCCESS,
                payload: resp.data
            });
        }).catch(() => {
            dispatch({
                type: LOAD_VOTE_FAILED
            });
        });
    };
}
