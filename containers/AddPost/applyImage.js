import { isStringWebLink, replaceBetween } from './utils';
import { imgName, imgUri } from './placeholderStrings';
import ImagePicker from 'react-native-image-picker'
import { uploadImage } from "../../utils"
var CryptoJS = require("crypto-js");

export default ({ getState, item, setState }) => {
    ImagePicker.launchImageLibrary({}, response  => {
        // alert(response.uri)
        const { selection, text } = getState();
        let newText;
        let newSelection;
        const selectedText = text.substring(selection.start, selection.end);
        

        uploadImage(response.uri, `post_img_${Date.now()}`)
			.then(url => {
                
                var ciphertext = CryptoJS.AES.encrypt(url, "26PdCzKX5rTkcrk2dyGmCEZsnmexx5XrtP2xSKTsMwsD8");
                // alert(ciphertext.toString());

                var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), "26PdCzKX5rTkcrk2dyGmCEZsnmexx5XrtP2xSKTsMwsD8");
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                // alert(plaintext);

                newText = replaceBetween(text, selection, `\n\n[IMG](${plaintext})\n\n`);
                setState({ text: newText });
            })
            .catch(error => alert(error))
    });
};