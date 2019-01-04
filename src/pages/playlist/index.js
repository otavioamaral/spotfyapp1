import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PlayListDetailsActions } from "../../store/ducks/playlistDetails";
import { Creators as PlayerActions } from "../../store/ducks/player";

import { Container, Header, SongList, SongItem } from "./styles";
import Loading from "../../components/Loading";

import clockIcon from "../../assets/images/clock.svg";
import plusIcon from "../../assets/images/plus.svg";

class Playlist extends Component {
    static PropTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.number
            })
        }).isRequired,
        getPlayListDetailsRequest: PropTypes.func.isRequired,
        playlistDetails: PropTypes.shape({
            data: PropTypes.shape({
                thumbnail: PropTypes.string,
                title: PropTypes.title,
                description: PropTypes.description,
                songs: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number,
                        title: PropTypes.title,
                        author: PropTypes.string,
                        album: PropTypes.string
                    })
                )
            }).isRequired,
            loading: PropTypes.bool
        }).isRequired,
        loadSong: PropTypes.func.isRequired,
        currentSong: PropTypes.shape({
            id: PropTypes.number
        }).isRequired
    };

    state = {
        selectedSong: null
    };

    componentDidMount() {
        this.loadPlaylistDetails();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadPlaylistDetails();
        }
    }

    loadPlaylistDetails = () => {
        const { id } = this.props.match.params;

        this.props.getPlayListDetailsRequest(id);
    };

    renderDetails = () => {
        const playlist = this.props.playlistDetails.data;

        return (
            <Container>
                <Header>
                    <img src={playlist.thumbnail} alt={playlist.title} />

                    <div>
                        <span>PLAYLIST</span>
                        <h1>{playlist.title}</h1>
                        {!!playlist.songs && (
                            <p>{playlist.songs.length} músicas</p>
                        )}

                        <button>Play</button>
                    </div>
                </Header>

                <SongList cellPadding={0} cellSpacing={0}>
                    <thead>
                        <th />
                        <th>Titulo</th>
                        <th>Artista</th>
                        <th>Album</th>
                        <th>
                            <img src={clockIcon} alt="duração" />
                        </th>
                    </thead>

                    <tbody>
                        {!playlist.songs ? (
                            <tr>
                                <td colspan={5}>Nenhuma música cadastrada</td>
                            </tr>
                        ) : (
                            playlist.songs.map(song => (
                                <SongItem
                                    key={song.id}
                                    onClick={() =>
                                        this.setState({ selectedSong: song.id })
                                    }
                                    onDoubleClick={() =>
                                        this.props.loadSong(
                                            song,
                                            playlist.songs
                                        )
                                    }
                                    selected={
                                        this.state.selectedSong === song.id
                                    }
                                    playing={
                                        this.props.currentSong &&
                                        this.props.currentSong.id === song.id
                                    }
                                >
                                    <td>
                                        <img src={plusIcon} alt="plusIcon" />
                                    </td>
                                    <td>{song.title}</td>
                                    <td>{song.author}</td>
                                    <td>{song.album}</td>
                                    <td>3:12</td>
                                </SongItem>
                            ))
                        )}
                    </tbody>
                </SongList>
            </Container>
        );
    };

    render() {
        return this.props.playlistDetails.loading ? (
            <Container loading>
                <Loading />
            </Container>
        ) : (
            this.renderDetails()
        );
    }
}

const mapStateToProps = state => ({
    playlistDetails: state.playlistDetails,
    currentSong: state.player.currentSong
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        { ...PlayListDetailsActions, ...PlayerActions },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist);
