export * from './uploadImage'

// Check if object is empty
export const isObjectEmpty = (obj) => (Object.keys(obj).length === 0 && obj.constructor === Object) ? true : false; 

// Another one...