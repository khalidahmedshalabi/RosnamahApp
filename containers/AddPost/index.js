import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { uploadImage } from '../../utils'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import ImagePicker from 'react-native-image-picker'
import MainHeader from '../../components/MainHeader'
import LazyContainer from '../../components/LazyContainer'
import colors, { bgColor, mainColor } from '../../constants/Colors';
import { MarkdownEditor } from 'react-native-markdown-editor';
import applyWrapFormat from './applyWrapFormat'
import applyWebLinkFormat from './applyWebLinkFormat'
import applyListFormat from './applyListFormat'
import { TextInput } from 'react-native-gesture-handler';
// import renderButtons from './renderButtons'

const FOREGROUND_COLOR = 'rgba(82, 194, 175, 1)';
const defaultStyles = { padding: 8, color: FOREGROUND_COLOR, fontSize: 16 };


const CUSTOM_Formats = [
  { key: 'B', title: 'B', wrapper: '**', onPress: applyWrapFormat, style: { fontWeight: 'bold' } },
  { key: 'I', title: 'I', wrapper: '*', onPress: applyWrapFormat, style: { fontStyle: 'italic' } },
  {
    key: 'U',
    title: 'U',
    wrapper: '__',
    onPress: applyWrapFormat,
    style: { textDecorationLine: 'underline' },
  },
  {
    key: 'S',
    title: 'S',
    wrapper: '~~',
    onPress: applyWrapFormat,
    style: { textDecorationLine: 'line-through' },
  },
  { key: 'WEB', title: 'YouTube', onPress: applyWebLinkFormat },
  { key: 'H1', title: 'H1', prefix: '#', onPress: applyListFormat },
  { key: 'H2', title: 'H2', prefix: '##', onPress: applyListFormat },
  { key: 'H3', title: 'H3', prefix: '###', onPress: applyListFormat },
  { key: 'H4', title: 'H4', prefix: '####', onPress: applyListFormat },
  { key: 'H5', title: 'H5', prefix: '#####', onPress: applyListFormat },
  { key: 'H6', title: 'H6', prefix: '######', onPress: applyListFormat },
];
export default class RichTextExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
      shouldRenderButtons: true
    }
  }
  onStrChange = str => {
    this.setState({ post: str }, () => {
      if(this.state.post == "") {
        this.setState({ shouldRenderButtons: true })
      }
    })
  }
  defaultMarkdownButton = ({ item, getState, setState }) => {
    if(this.state.shouldRenderButtons) {
      return (
        <TouchableOpacity onPress={() => item.onPress({ getState, setState, item })}>
          <Text style={[defaultStyles, item.style]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  render() {
    const { navigation } = this.props 
    return (
      <LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
        <MainHeader navigation={navigation} />
        <View style={styles.container}>
          <TextInput style={{ fontSize: 28, fontWeight: "bold" }} placeholder="post title" />
          <MarkdownEditor markdownButton={this.defaultMarkdownButton} onMarkdownChange={str => this.onStrChange(str)} Formats={CUSTOM_Formats} />
        </View>
        {
          this.state.post === "" ? <View style={{ width, height: 50, backgroundColor: "#ffffff", position: "absolute", bottom: 0 }}></View> : null
        }
        </LazyContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  richText: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});