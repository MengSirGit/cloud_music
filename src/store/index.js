import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import {currMusic} from './reducers'


let reducers = combineReducers({
    currMusic
})

let store = createStore(reducers, applyMiddleware(thunk))

export default store
