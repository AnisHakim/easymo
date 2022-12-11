import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import logger from 'redux-logger-simple';
import { persistStore, persistReducer } from 'redux-persist';
import storageLocal from 'redux-persist/lib/storage';
import PropertiesReducer from './Reducer/PropertiesReducer';
import SideBarReducer from './Reducer/SideBarReducer';
import contactReducer from './Reducer/ContactReducer';
import NavbarConnexionReducer from './Reducer/NavbarConnexionReducer';
const persistConfig = {
    key: 'root-properties',
    timeout: null,
    storage: storageLocal,
    whitelist: ["properties", "sideBar"],
    blacklist: []
};
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(applyMiddleware(logger));
const reducers = combineReducers({
    properties: PropertiesReducer,
    sideBar: SideBarReducer,
    contacts: contactReducer,
    navBar: NavbarConnexionReducer
});
const persistedReducers = persistReducer(persistConfig, reducers);
const PropStore = createStore(persistedReducers, enhancer);
export default PropStore;
export const persistor = persistStore(PropStore);