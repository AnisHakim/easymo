import { createStore, applyMiddleware, combineReducers, } from 'redux';
import logger from 'redux-logger-simple';
// import SideBarReducer from './Reducers/SideBarReducer';

const enhancer = applyMiddleware(logger);
const reducers = combineReducers({
    // sideBar: SideBarReducer
});

const DsStore = createStore(reducers, enhancer);

export default DsStore;
