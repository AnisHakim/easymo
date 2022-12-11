import AuthReduce from './Reducers/authReducer';
import LoginReduce from './Reducers/LoginReduce';


import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import logger from 'redux-logger-simple';
import { persistStore, persistReducer } from 'redux-persist';
import storageLocal from 'redux-persist/lib/storage';
const persistConfig = {
   key: 'auth-root',
   timeout: null,
   storage: storageLocal,
   whitelist: ['auth', 'login'],
   blacklist: [""]
};
const composeEnhancers =
   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
const enhancer = composeEnhancers(applyMiddleware(logger));
const reducers = combineReducers({
   login: LoginReduce,
   auth: AuthReduce
});
const persistedReducers = persistReducer(persistConfig, reducers);
const Store = createStore(persistedReducers, enhancer);
export default Store;
export const persistor = persistStore(Store);