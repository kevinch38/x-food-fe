import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isLoading: false,
		error: null,
		errorKey: 0,
		success: null,
		successKey: 0,
	},
	reducers: {
		loading: (state) => {
			state.isLoading = true;
		},
		success: (state, { payload }) => {
			state.isLoading = false;
			state.successKey += 1;
			// const ignoreList = ['successfully get all merchants','successfully get all merchant branch','successfully delete merchant'];
			// if (!ignoreList.includes(payload.message)) {
				if (payload && payload.data && payload.messageBox) {
					state.success = payload.messageBox;
				} else if (typeof payload === 'string') {
					state.success = payload;
				}
			// }
		},
		error: (state, { payload }) => {
			state.isLoading = false;
			state.errorKey += 1;
			if (
				payload.response &&
				payload.response.data &&
				payload.response.data.message
			) {
				state.error = payload.response.data.message;
			} else if (typeof payload === 'string') {
				state.error = payload;
			} else {
				state.error = 'An unknown error occurred.';
			}
		},
		finish: (state) => {
			(state.isLoading = false), (state.error = null);
		},
	},
});

export const { loading, success, error, finish } = uiSlice.actions;

export default uiSlice;
