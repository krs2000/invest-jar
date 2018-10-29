import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Components/Home/Home';
import HistoryComponent from './Components/History/History';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './configureStore';


let store = configureStore().store;
let persistor = configureStore().persistor;

ReactDOM.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <Router>
            <Switch>
                <Route exact path='/history' component={HistoryComponent} />
                <Route exact path='/widraw' component={Home} />
                <Route exact path='/invest' component={Home} />
                <Route exact path='/add' component={Home} />
                <Route exact path='/' component={Home} />
            </Switch>
        </Router>
        </PersistGate>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
