import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PlayListsActions } from "../../store/ducks/playlists";

import { Container, NewPlaylist, Nav } from "./syles";

import Loading from "../../components/Loading";

import addPlaylistIcon from "../../assets/images/add_playlist.svg";

class Sidebar extends Component {
    static propTypes = {
        getPlaylistsRequest: PropTypes.func.isRequired,
        Playlists: PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    title: PropTypes.string
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
                <div>
                    <Nav main>
                        <li>
                            <Link to="/">Navegar</Link>
                        </li>
                        <li>
                            <Link to="/">Rádio</Link>
                        </li>
                    </Nav>

                    <Nav>
                        <li>
                            <span>Sua Biblioteca</span>
                        </li>
                        <li>
                            <a href="/">Seu Daily Mix</a>
                        </li>
                        <li>
                            <a href="/">Tocados Recentemente</a>
                        </li>
                        <li>
                            <a href="/">Músicas</a>
                        </li>
                        <li>
                            <a href="/">Álbums</a>
                        </li>
                        <li>
                            <a href="/">Artistas</a>
                        </li>
                        <li>
                            <a href="/">Estações</a>
                        </li>
                        <li>
                            <a href="/">Arquivos Locais</a>
                        </li>
                        <li>
                            <a href="/">Videos</a>
                        </li>
                        <li>
                            <a href="/">Podcasts</a>
                        </li>
                    </Nav>

                    <Nav>
                        <li>
                            <span>PLAYLISTS</span>
                            {this.props.playlists.loading && <Loading />}
                        </li>

                        {this.props.playlists.data.map(playlist => (
                            <li key={playlist.id}>
                                <Link to={`/playlists/${playlist.id}`}>
                                    {playlist.title}
                                </Link>
                            </li>
                        ))}
                    </Nav>
                </div>
                <NewPlaylist>
                    <img src={addPlaylistIcon} alt="Adicionar Playlist" />
                    Nova Playlist
                </NewPlaylist>
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
)(Sidebar);
