export const Types = {
    GET_REQUEST: "playlistDetails/GET_REQUEST",
    GET_SUCCESS: "playlistDetails/GET_SUCCESS"
};

const INITIAL_STATE = {
    data: {},
    loading: false
};

export default function playlistDetails(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.GET_REQUEST:
            return { ...state, loading: true };
        case Types.GET_SUCCESS:
            return { data: action.payload.data, loading: false, error: null };
        default:
            return state;
    }
}

export const Creators = {
    getPlayListDetailsRequest: id => ({
        type: Types.GET_REQUEST,
        payload: { id }
    }),

    getPlaylistDetailsSuccess: data => ({
        type: Types.GET_SUCCESS,
        payload: { data }
    })
};
