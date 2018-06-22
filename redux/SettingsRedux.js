const types = {
	SET_BIO: 'SET_BIO',
	SET_NAME: 'SET_NAME',
	SET_PROFILE_IMG: 'SET_PROFILE_IMG',
	SET_IS_MALE: 'SET_IS_MALE',
	SET_DATE: 'SET_DATE',
};

export const actions = {
	setBio: (dispatch, bio) => {
		dispatch({ type: types.SET_BIO, bio })
	},
	setName: (dispatch, name) => {
		dispatch({ type: types.SET_NAME, name })
	},
	setProfileImg: (dispatch, img_url) => {
		dispatch({ type: types.SET_PROFILE_IMG, img_url })
	},
	setIsMale: (dispatch, isMale) => {
		dispatch({ type: types.SET_IS_MALE, isMale })
	},
	setDate: (dispatch, date) => {
		dispatch({ type: types.SET_DATE, date })
	},
}

const initialState = {
	bio: '',
	name: '',
	img_url: '',
	isMale: true,
	date: ''
}

export const reducer = (state = initialState, action) => {
	const { bio, name, isMale, date, img_url } = action;

	switch (action.type) {
		case types.SET_BIO:
			return { ...state, bio };
		case types.SET_NAME:
			return { ...state, name };
		case types.SET_PROFILE_IMG:
			return { ...state, img_url };
		case types.SET_IS_MALE:
			return { ...state, isMale };
		case types.SET_DATE:
			return { ...state, date };
		default:
			return state
	}
}