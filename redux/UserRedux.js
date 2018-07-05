const types = {
	SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
};

export const actions = {
	setAuthToken: (dispatch, auth_token) => {
		dispatch({ type: types.SET_AUTH_TOKEN, auth_token })
	},
};

const initialState = {
	auth_token: '',
}

export const reducer = (state = initialState, action) => {
	const { auth_token } = action;
	switch (action.type) {
		case types.SET_AUTH_TOKEN:
			return { ...state, auth_token };
		default:
			return state
	}
}