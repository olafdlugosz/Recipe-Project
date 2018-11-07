import "./css/site.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Home } from "./components/Home";
import {HashRouter} from "react-router-dom";

function renderApp(): void {
    ReactDOM.render(<AppContainer>
        <HashRouter>     
        <Home/>
        </HashRouter> 
    </AppContainer>, document.getElementById("react-app"));
}

renderApp();

if (module.hot) {
    module.hot.accept('./components/Home', () => {
        renderApp();
    });
}
