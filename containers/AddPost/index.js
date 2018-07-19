import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { uploadImage } from '../../utils'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import ImagePicker from 'react-native-image-picker'
import MainHeader from '../../components/MainHeader'

const actions = {
	setBold: 'bold',
	setItalic: 'italic',
	insertImage: 'INST_IMAGE',
	insertBulletsList: 'unorderedList',
	insertOrderedList: 'orderedList',
	insertLink: 'INST_LINK',
	}
export default class RichTextExample extends Component {

  constructor(props) {
    super(props);
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }
  render() {
    const { navigation } = this.props 
    return (
        <View style={styles.container}>
        {/* <TouchableOpacity style={{  }} onPress={() => this._pickImage()} >
          <Text>asklfhalksfh</Text>
        </TouchableOpacity> */}
        <MainHeader navigation={navigation} />
          <RichTextEditor
              ref={(r)=>this.richtext = r}
              style={styles.richText}
              initialTitleHTML={'Title!!'}
              initialContentHTML={''}
              editorInitializedCallback={() => this.onEditorInitialized()}
          />
          <RichTextToolbar
			getEditor={() => this.richtext}
      selectedButtonStyle={{backgroundColor:'blue'}}
			actions={[
				actions.insertLink,
				actions.insertBulletsList,
				actions.insertOrderedList,
				actions.insertImage,
      ]}
      onPressAddImage={() => {
        // let imageSrc = this._pickImage()
        ImagePicker.launchImageLibrary({}, response  => {
          var src = Platform.OS === 'ios' ? response.uri : response.path
          this.richtext.insertImage({ src, width: 200, height: 200});  
        })
      }}
          />
          {Platform.OS === 'ios' && <KeyboardSpacer/>}
        </View>
    );
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
  }

  async getHTML() {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
    //alert(titleHtml + ' ' + contentHtml)
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingTop: 40
  },
  richText: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});