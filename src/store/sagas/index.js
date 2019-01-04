import { all, takeLatest } from "redux-saga/effects";

import { Types as PlaylistsTypes } from "../ducks/playlists";
import { Types as PlaylistDetailsTypes } from "../ducks/playlistDetails";

import { getPlayLists } from "./playlists";
import { getPlaylistDetails } from "./playlistsDetails";

export default function* rootSaga() {
    yield all([
        takeLatest(PlaylistsTypes.GET_REQUEST, getPlayLists),
        takeLatest(PlaylistDetailsTypes.GET_REQUEST, getPlaylistDetails)
    ]);
}
