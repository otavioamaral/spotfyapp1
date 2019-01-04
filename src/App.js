import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./config/reactotron";

import GlobalStyles from "./styles/global";
import SideBar from "./components/Sidebar";
import Player from "./components/Player";
import Header from "./components/Header";
import ErrorBox from "./components/ErrorBox";

import { Wrapper, Container, Content } from "./styles/components";

import Routes from "./routes";
import store from "./store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Fragment>
                        <GlobalStyles />
                        <Wrapper>
                            <Container>
                                <SideBar />
                                <Content>
                                    <ErrorBox />
                                    <Header />
                                    <Routes />
                                </Content>
                            </Container>
                            <Player />
                        </Wrapper>
                    </Fragment>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
