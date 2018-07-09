import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { moves, shuffledCards } from './reducers/reducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({ moves, shuffledCards })
const store = createStore(rootReducer);

ReactDOM.render(<App store={store} />, document.getElementById('root'));

