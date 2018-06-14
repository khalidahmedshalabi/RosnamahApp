import axios from 'axios';
import { EventRegister } from 'react-native-event-listeners';
import { Server } from '../constants';
//import { types } from '../redux/LoginRedux.js';
import { store } from '../App';

// This function, in addition to handling when the response is a success/failure, it automatically handles other response codes.
export const HandleHttpResponses = (response, onSuccess, onFailure) => {
	switch (response.status) {
		case 200: // SUCCESS
		{
			onSuccess(response);
			break;
		}
		case 400: // BAD REQUEST, e.g. user not found ..etc
		{
			onFailure(response);
			break;
		}
		case 500: // INTERNAL SERVER ERROR
		{
			// Send a message to user, e.g. "We're facing a problem now. Come back later!"
			alert("Server problems...");
			break;
		}
		case 406: // MODEL VALIDATION ERROR
		{
			alert('Validation error. Please contact the developer. This must not exist.')
			onFailure(response);
			break;
		}
		case 203:
		case 401:
		{
			// Log out and call Signout API
			console.log(`Server responded with ${response.status}. Log out user.`)
			//store.dispatch({ type: types.SET_LOGGED_IN, logged_in: false, do_not_call_api: true })
			break;
		}
	}
}

const HTTP_REQUEST = (
	method, endpoint, post_data, 
	onSuccess, onFailure, shouldAuthorize, 
	shouldDisplayOverlay = true, contentType = 'application/json') => {

	if (shouldDisplayOverlay)
		EventRegister.emit('onHttpRequestStateChange', true);

	axios({
		method,
		headers: shouldAuthorize || shouldAuthorize === undefined ? {
			'Content-Type': contentType,
			'auth': store.getState().user.auth_token
		} : { 'Content-Type': contentType },
		url: `${Server.base_url}/${endpoint}`,
		data: post_data
	}).then(function (response) {
		if (shouldDisplayOverlay)
			EventRegister.emit('onHttpRequestStateChange', false);

		HandleHttpResponses(
			response,
			onSuccess,
			onFailure);
	}).catch(function (error) {
		if (shouldDisplayOverlay)
			EventRegister.emit('onHttpRequestStateChange', false);

		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			HandleHttpResponses(
				error.response,
				onSuccess,
				onFailure);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
			onFailure(error);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
			onFailure(error);
		}
		console.log(error.config);
	});
}

export const POST = (endpoint, post_data, onSuccess, onFailure, shouldAuthorize = true, shouldDisplayOverlay = true) => {
	HTTP_REQUEST('post', endpoint, post_data, onSuccess, onFailure, shouldAuthorize, shouldDisplayOverlay);
}

export const GET = (endpoint, onSuccess, onFailure, shouldAuthorize = true, shouldDisplayOverlay = true) => {
	HTTP_REQUEST('get', endpoint, null, onSuccess, onFailure, shouldAuthorize, shouldDisplayOverlay);
}

export const DELETE = (endpoint, onSuccess, onFailure, shouldAuthorize = true, shouldDisplayOverlay = true) => {
	HTTP_REQUEST('delete', endpoint, null, onSuccess, onFailure, shouldAuthorize, shouldDisplayOverlay);
}

export const IMG = (endpoint, data, onSuccess, onFailure, shouldAuthorize = true, shouldDisplayOverlay = true) => {
	HTTP_REQUEST('post', endpoint, data, onSuccess, onFailure, shouldAuthorize, shouldDisplayOverlay, 'multipart/form-data');
}

export default { GET, POST, DELETE, IMG };