import { I18nManager } from 'react-native';
import { setActiveLanguage, addTranslationForLanguage } from 'react-localize-redux';
import { EventRegister } from 'react-native-event-listeners'
import RNRestart from 'react-native-restart'
import { GET } from '../utils/Network'
import { Languages, ar, en } from '../constants/Languages';

const types = {
	SWITCH_LANGUAGE: 'SWITCH_LANGUAGE',
	STORE_LANGUAGES_DATA: 'STORE_LANGUAGES_DATA',
	STORE_CURRENT_LANGUAGE_TRANSLATION: 'STORE_CURRENT_LANGUAGE_TRANSLATION',
	STORE_LANGUAGE_VERSION: 'STORE_LANGUAGE_VERSION'
};

export const actions = {
	switchLanguage: (dispatch, currLang, shouldFetchTranslation = true) => {
		const doSwitchLanguage = (currLang) => {
			dispatch(setActiveLanguage(currLang.code));
			dispatch({
				type: types.SWITCH_LANGUAGE,
				currLang
			})
			setTimeout(() => {
				let
					currentIsRTL = I18nManager.isRTL;
				if (currLang.isRTL === currentIsRTL) {
					EventRegister.emit('Event_translateScreensTitle', {});
				} else {
					I18nManager.forceRTL(!currentIsRTL)
					RNRestart.Restart()
				}
			}, 50);
		}

		// This will be removed
		dispatch({ type: 'STORE_CURRENT_LANGUAGE_TRANSLATION', translation_data: currLang.code === 'ar' ? ar : en })
		dispatch(addTranslationForLanguage(currLang.code === 'ar' ? ar : en, currLang.code));
		doSwitchLanguage(currLang)

		/*if (shouldFetchTranslation) {
			GET(`Language/Translation?language=${currLang.key}`,
				(response) => {
					//dispatch({ type: 'STORE_CURRENT_LANGUAGE_TRANSLATION', translation_data: response.data.translations })
					dispatch({ type: 'STORE_CURRENT_LANGUAGE_TRANSLATION', translation_data: currLang.code === 'ar' ? ar : en })

					// Add data for this language
					//dispatch(addTranslationForLanguage(response.data.translations, currLang.code));
					dispatch(addTranslationForLanguage(currLang.code === 'ar' ? ar : en, currLang.code));

					doSwitchLanguage(currLang)
				},
				(error) => console.log(error),
				false)
		}
		else {
			doSwitchLanguage(currLang)
		}*/
	},
	storeLanguagesData: (dispatch, languages_data) => {
		dispatch({ type: types.STORE_LANGUAGES_DATA, languages_data })
	},
	storeLanguagesVersion: (dispatch, languages_version) => {
		dispatch({ type: types.STORE_LANGUAGE_VERSION, languages_version })
	},
	storeCurrLangTranslation: (dispatch, translation_data) => {
		dispatch({ type: types.STORE_CURRENT_LANGUAGE_TRANSLATION, translation_data })
	},
};

const initialState = {
	currLang: { key: 1, label: 'العربية', code: 'ar', isRTL: true, isDefault: true },
	languages_data: Languages,
	languages_version: '',
	translation_data: ar
}

export const reducer = (state = initialState, action) => {
	const { currLang, languages_data, languages_version, translation_data } = action;
	switch (action.type) {
		case types.SWITCH_LANGUAGE:
			return { ...state, currLang };
		case types.STORE_LANGUAGES_DATA:
			return { ...state, languages_data };
		case types.STORE_LANGUAGE_VERSION:
			return { ...state, languages_version };
		case types.STORE_CURRENT_LANGUAGE_TRANSLATION:
			return { ...state, translation_data };
		default:
			return state
	}
}