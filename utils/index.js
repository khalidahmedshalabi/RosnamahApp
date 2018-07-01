export * from './uploadImage'
// Check whether email is valid or not
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (email) => emailRegex.test(email);

// Check if object is empty
export const isObjectEmpty = (obj) => (Object.keys(obj).length === 0 && obj.constructor === Object) ? true : false; 

// Another one...