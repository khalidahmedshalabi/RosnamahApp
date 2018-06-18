import React from 'react';
import { initialize, addTranslationForLanguage } from 'react-localize-redux';
import RootNavigation from './navigation/RootNavigation';
import { connect } from 'react-redux';
import { GET } from './utils/Network';
import { NetInfo } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

import OfflineSign from './components/OfflineSign'

class AppNoReduxPersist extends React.Component {
	fetchLanguages = (newVersion, isFirstTime) => {
		GET('Language',
			(response) => {
				const { store, storeLanguagesData } = this.props;
				const { languages } = response.data;

				storeLanguagesData(languages);
				
				let  
					langToGet = isFirstTime ? 
						languages.find(lang => lang.isDefault === true) : 
						languages.find(lang => lang.code === this.props.currLang.code);

				// Initialize react-localize-redux with our array of languages
				store.dispatch(initialize(languages));

				GET(`Language/Translation?language=${langToGet.key}`,
					(response) => {
						const { storeCurrLangTranslation, storeLanguagesVersion, switchLanguage } = this.props;

						storeCurrLangTranslation(response.data.translations)

						// Add data for this language
						store.dispatch(addTranslationForLanguage(response.data.translations, langToGet.code));

						// Get language reducer
						const languageReducer = store.getState().language;

						// Make sure it's valid before taking any further actions
						if (languageReducer) {
							switchLanguage(langToGet, false)
						}

						// Should close splash screen at this point

						// Allow rendering now
						this.setState({ isLoadingLanguages: false })

						// Store the latest version locally
						storeLanguagesVersion(newVersion)
					},
					(error) => console.log(error),
					false)
			},
			(error) => console.log(error),
			false);
	}

	LoadLocallyStoredLanguage = () => {
		console.log('Loading locally stored language');

		// Get Redux store from props
		const { store, currLang, languages_data, translation_data, switchLanguage } = this.props;

		// Initialize react-localize-redux with our array of languages
		store.dispatch(initialize(languages_data, { defaultLanguage: currLang.code }));

		// Add data for current language language
		store.dispatch(addTranslationForLanguage(translation_data, currLang.code));

		switchLanguage(currLang, false);
	}

	shouldFetchLanguages = () => {
		const { languages_version } = this.props;

		// Check if local translation data exists
		if (languages_version) {
			console.log('Found locally stored language data. Loading it although it could be outdated.');

			this.LoadLocallyStoredLanguage();

			// Should close splash screen at this point

			// Allow rendering now
			this.setState({ isLoadingLanguages: false })
		}

		// Check and compare translation data versions (local against remote)
		GET('Language/Version',
			(response) => {
				console.log('stored languages_version = ' + languages_version)

				// If versions don't match, or no local translation data existed
				if (!languages_version || response.data.version.value !== languages_version) {
					console.log("Language versions don't match, or no local translation data exists");

					this.fetchLanguages(response.data.version.value, (!languages_version) ? true : false);
				}
			},
			(error) => {
				console.log('Encountered an error while checking language versions', error);

				if (!languages_version) {
					this.LoadLocallyStoredLanguage();

					// Should close splash screen at this point

					// Allow rendering now
					this.setState({ isLoadingLanguages: false })
				}
			},
			false);
	}

	constructor(props) {
		super(props);

		this.state = {
			isLoadingLanguages: true,
			isConnected: true,
			isHttpRequesting: false,
		}
	}

	handleConnectivityChange = (isConnected) => {
		this.setState({ isConnected })
		this.shouldFetchLanguages();
	};
	onHttpRequestStateChange = (is_requesting) => this.setState({ isHttpRequesting: is_requesting })

	componentDidMount() {
		this.shouldFetchLanguages()

		// Handle first isConnected state to toggle the connectivity sign
		NetInfo.isConnected.fetch().then(isConnected => this.setState({ isConnected }))
		
		// Listen for future changes too
		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

		// Listen for when an HTTP request is being made, so we can display the overlay
		this.listener = EventRegister.addEventListener('onHttpRequestStateChange', this.onHttpRequestStateChange);
	}

	componentWillUnmount() {
		// Remove listeners

		NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
		EventRegister.removeEventListener(this.listener);
	}

	render() {
		if (this.state.isLoadingLanguages)
			return null;

		if(this.state.isConnected) {
			if(!this.state.isHttpRequesting)
				return <RootNavigation key='0' />
			else {
				return (
					[
						<RootNavigation key='0' />,
						null // should add a screen overlay (activity indicator) here
					]
				)
			}
		}
		else {
			return (
				[
					<RootNavigation key='0' />,
					<OfflineSign key='1' />
				]
			)
		}
	}
}

const mapStateToProps = (state) => ({
	languages_version: state.language ? state.language.languages_version : '',
	currLang: state.language ? state.language.currLang : {},
	languages_data: state.language ? state.language.languages_data : [],
	translation_data: state.language ? state.language.translation_data : {}
})

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('./redux/LangRedux.js');
	return {
		...ownProps,
		...stateProps,
		switchLanguage: (lang, fetch) => actions.switchLanguage(dispatch, lang, fetch),
		storeLanguagesData: (languages_data) => actions.storeLanguagesData(dispatch, languages_data),
		storeCurrLangTranslation: (translation_data) => actions.storeCurrLangTranslation(dispatch, translation_data),
		storeLanguagesVersion: (languages_version) => actions.storeLanguagesVersion(dispatch, languages_version),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(AppNoReduxPersist)