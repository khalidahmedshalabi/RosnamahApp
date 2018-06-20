//import { POST } from '../utils/Network'

export const types = {
	SKIP_LOGIN: 'SKIP_LOGIN',
	SET_LOGGED_IN: 'SET_LOGGED_IN'
};

export const actions = {
	skipLogin: (dispatch, skipped_login) => {
		dispatch({ type: types.SKIP_LOGIN, skipped_login })
	},
	setLoggedIn: (dispatch, logged_in, do_not_call_api = false) => {
		/*if (!logged_in && !do_not_call_api) {
			// If was set to log out
			POST('Signout', { },
				(response) => { },
				(error) => {
					console.log(error)
				},
				true);
		}*/

		dispatch({ type: types.SET_LOGGED_IN, logged_in })
	},
};

const initialState = {
	skipped_login: false,
	logged_in: false
}

export const reducer = (state = initialState, action) => {
	const { skipped_login, logged_in } = action;
	switch (action.type) {
		case types.SKIP_LOGIN:
			return { ...state, skipped_login };
		case types.SET_LOGGED_IN:
			return { ...state, logged_in };
		default:
			return state
	}
}