import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import 'normalize-css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

console.log(store.getState());

const jxs = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jxs,document.getElementById('app'));
