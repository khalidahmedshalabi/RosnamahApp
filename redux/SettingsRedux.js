const types = {
	SET_BIO: 'SET_BIO',
	SET_NAME: 'SET_NAME',
	SET_PROFILE_IMG: 'SET_PROFILE_IMG',
	SET_IS_MALE: 'SET_IS_MALE',
	SET_BIRTHDATE: 'SET_BIRTHDATE',
	SET_SETTINGS_LAST_UPDATED: 'SET_SETTINGS_LAST_UPDATED'
};

export const actions = {
	setBio: (dispatch, bio) => {
		dispatch({ type: types.SET_BIO, bio })
	},
	setName: (dispatch, name) => {
		dispatch({ type: types.SET_NAME, name })
	},
	setProfileImg: (dispatch, profile_img_url) => {
		dispatch({ type: types.SET_PROFILE_IMG, profile_img_url })
	},
	setIsMale: (dispatch, isMale) => {
		dispatch({ type: types.SET_IS_MALE, isMale })
	},
	setBirthDate: (dispatch, birthdate) => {
		dispatch({ type: types.SET_BIRTHDATE, birthdate })
	},
	setSettingsLastUpdated: (dispatch, settings_last_updated) => {
		dispatch({ type: types.SET_SETTINGS_LAST_UPDATED, settings_last_updated })
	},
}

const initialState = {
	bio: '',
	name: '',
	profile_img_url: '',
	isMale: -1,
	birthdate: '',
	settings_last_updated: '',
}

export const reducer = (state = initialState, action) => {
	const { bio, name, isMale, birthdate, profile_img_url, settings_last_updated } = action;

	switch (action.type) {
		case types.SET_BIO:
			return { ...state, bio };
		case types.SET_NAME:
			return { ...state, name };
		case types.SET_PROFILE_IMG:
			return { ...state, profile_img_url };
		case types.SET_IS_MALE:
			return { ...state, isMale };
		case types.SET_BIRTHDATE:
			return { ...state, birthdate };
		case types.SET_SETTINGS_LAST_UPDATED:
			return { ...state, settings_last_updated };
		default:
			return state
	}
}