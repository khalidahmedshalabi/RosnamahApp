import React from 'react';
import { Provider } from 'react-redux';
import { Platform ,Linking} from 'react-native'

import AppNoReduxPersist from './AppNoReduxPersist';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './redux/configureStore'

const { persistor, store } = configureStore();

// Export the store, so we can use it outside React components (where we can't connect)
// I don't know if there's a better way to achieve that..
export { store };

const onBeforeLift = () => {
	// take some action before the gate lifts
}

class App extends React.Component {
	
	render() {
		return (
			<Provider store={store}>
				<PersistGate
					loading={null}
					onBeforeLift={onBeforeLift}
					persistor={persistor}>
					<AppNoReduxPersist store={store} />
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
