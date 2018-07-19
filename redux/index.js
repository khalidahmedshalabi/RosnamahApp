import { combineReducers } from 'redux';

// Import all reducers
import { reducer as LangRedux } from './LangRedux';
import { reducer as LoginRedux } from './LoginRedux';
import { reducer as SettingsRedux } from './SettingsRedux';
import { reducer as FirstRunStuffRedux } from './FirstRunStuffRedux';
import { reducer as UserRedux } from './UserRedux';
import { localeReducer as locale } from 'react-localize-redux';

// Combine the imported reducers
const AppReducers = combineReducers({
	language: LangRedux,
	login: LoginRedux,
	firstRun: FirstRunStuffRedux,
	settings: SettingsRedux,
	user: UserRedux,
	locale
});


// Export the combined reducers
export default AppReducers;