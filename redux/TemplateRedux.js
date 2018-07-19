const types = {
	SOME_VAR: 'SOME_VAR',
};

export const actions = {
	setSomeVarValue: (dispatch, some_var) => {
		dispatch({ type: types.SOME_VAR, some_var })
	},
};

const initialState = {
	some_var : 0,
}

export const reducer = (state = initialState, action) => {
	const { some_var } = action;

	switch (action.type) {
		case types.SOME_VAR:
			return { ...state, some_var };
		default: 
			return state
	}
}