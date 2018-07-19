import { Platform } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'

// Init Firebase
const config = {
  apiKey: "AIzaSyB2eG97MECl045B82j21UBmcEyppDdXWps",
  authDomain: "rosnamahapp.firebaseapp.com",
  databaseURL: "https://rosnamahapp.firebaseio.com",
  projectId: "rosnamahapp",
  storageBucket: "rosnamahapp.appspot.com",
  messagingSenderId: "856960674894"
};
firebase.initializeApp(config)
const storage = firebase.storage()

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const uploadImage = (uri, placeName, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
		let uploadBlob = null
    const imageRef = storage.ref(placeName).child(`${sessionId}.jpg`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}
