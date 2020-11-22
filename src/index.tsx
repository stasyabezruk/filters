import React from "react";
import { render } from "react-dom";
import { SdkListModal } from './components';
import { Provider } from "react-redux";
import { store } from "src/app/store";
import "src/styles/index.scss";

const App = () => {
    return (
        <Provider store={store}>
            <SdkListModal />
        </Provider>
    );
};

render(<App />, document.getElementById("root"));