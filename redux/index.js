import { combineReducers } from 'redux';

// Import all reducers
import { reducer as LangRedux } from './LangRedux';
import { reducer as LoginRedux } from './LoginRedux';
import { reducer as FirstRunStuffRedux } from './FirstRunStuffRedux';
import { localeReducer as locale } from 'react-localize-redux';

// Combine the imported reducers
const AppReducers = combineReducers({
	language: LangRedux,
	login: LoginRedux,
	firstRun: FirstRunStuffRedux,
	locale
});


// Export the combined reducers
export default AppReducers;