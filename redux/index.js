import { combineReducers } from 'redux';

// Import all reducers
import { reducer as LangRedux } from './LangRedux';
import { reducer as TemplateRedux } from './TemplateRedux';
import { reducer as FirstRunStuffRedux } from './FirstRunStuffRedux';
import { localeReducer as locale } from 'react-localize-redux';

// Combine the imported reducers
const AppReducers = combineReducers({
	language: LangRedux,
	template: TemplateRedux,
	firstRun: FirstRunStuffRedux,
	locale
});


// Export the combined reducers
export default AppReducers;