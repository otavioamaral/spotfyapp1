import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PlayListsActions } from "../../store/ducks/playlists";

import Loading from "../../components/Loading";

import { Container, Title, List, Playlist } from "./styles";

class Browse extends Component {
    static propTypes = {
        getPlaylistsRequest: PropTypes.func.isRequired,
        Playlists: PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    title: PropTypes.string,
                    thumbail: PropTypes.string,
                    description: PropTypes.string
                })
            ),
            Loading: PropTypes.bool
        }).isRequired
    };

    componentDidMount() {
        this.props.getPlayListsRequest();
    }

    render() {
        return (
            <Container>
                <Title>
                    Navegar {this.props.playlists.loading && <Loading />}
                </Title>

                <List>
                    {this.props.playlists.data.map(playlist => (
                        <Playlist
                            key={playlist.id}
                            to={`/playlists/${playlist.id}`}
                        >
                            <img
                                src={playlist.thumbnail}
                                alt={playlist.title}
                            />

                            <strong>{playlist.title}</strong>
                            <p>{playlist.description}</p>
                        </Playlist>
                    ))}
                </List>
            </Container>
        );
    }
}
const mapStateToProps = state => ({
    playlists: state.playlists
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(PlayListsActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Browse);
