import React from "react";

import loadingIcon from "../../assets/images/loading.svg";

import { Spinner } from "./styles";

const Loading = () => <Spinner src={loadingIcon} alt="Carregando" />;

export default Loading;
