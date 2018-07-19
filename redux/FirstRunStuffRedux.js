const types = {
	SEEN_INTRO: 'SEEN_INTRO',
};

export const actions = {
	markSeenIntro: (dispatch, seen_intro) => {
		dispatch({ type: types.SEEN_INTRO, seen_intro })
	},
};

const initialState = {
	seen_intro : false,
}

export const reducer = (state = initialState, action) => {
	const { seen_intro } = action;

	switch (action.type) {
		case types.SEEN_INTRO:
			return { ...state, seen_intro };
		default: 
			return state
	}
}