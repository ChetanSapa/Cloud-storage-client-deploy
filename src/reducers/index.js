import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import {fileReducer} from './fileReducer'
import {userReducer} from './userReducer'
import {uploadReducer} from './uploadReducer'
import {appReducer} from './appReducer'
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer,
    app: appReducer
})
//What whith you redux-devtools-extension?
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))