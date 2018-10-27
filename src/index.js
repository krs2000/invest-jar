import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Components/Home/Home';
import reducer from "./Reducers";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, compose } from "redux";
import * as serviceWorker from './serviceWorker';

const store = createStore(
	reducer,
	compose(
		// middleware
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

ReactDOM.render(
<Provider store={store}>
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </Router>
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
