import { createStore, combineReducers, applyMiddleware } from 'redux'
import {  routerReducer } from 'react-router-redux'


const reduxChromeExtesionConnection = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const reducers = {
    router: routerReducer,
}

const combinedReducers  = combineReducers(reducers)

const store = createStore(combinedReducers, {}, reduxChromeExtesionConnection)
export default store