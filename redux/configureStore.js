import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // AsyncStorage for react-native

import AppReducers from './index';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [
		
	],
}

const persistedReducer = persistReducer(persistConfig, AppReducers)

export default () => {
	let store = createStore(persistedReducer)
	let persistor = persistStore(store)
	return { store, persistor }
}