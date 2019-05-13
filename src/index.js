import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';

//REDUX 
import { createStore } from 'redux'; 
import reducer from './store/reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer,composeWithDevTools());

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>, 
    document.getElementById('root')
);

export default store;

serviceWorker.unregister();
