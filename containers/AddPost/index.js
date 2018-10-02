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
import { Button } from 'native-base';
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
import applyImage from './applyImage';
import FontedInput from '../../components/FontedInput';
import FontedText from '../../components/FontedText';
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';

// var shortUrl = require('node-url-shortener');
// const { setKey, shorten, expand } = require('react-native-google-shortener');
// setKey("AIzaSyCgZhI2uotbTgGJ4u2urJJTc3L1kpj0k24");

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
  { key: 'IMG', title: 'Image', onPress: applyImage },
  { key: 'WEB', title: 'YouTube', onPress: applyWebLinkFormat },
  { key: 'H1', title: 'H1', prefix: '#', onPress: applyListFormat },
  { key: 'H2', title: 'H2', prefix: '##', onPress: applyListFormat },
  { key: 'H3', title: 'H3', prefix: '###', onPress: applyListFormat },
  { key: 'H4', title: 'H4', prefix: '####', onPress: applyListFormat },
  { key: 'H5', title: 'H5', prefix: '#####', onPress: applyListFormat },
  { key: 'H6', title: 'H6', prefix: '######', onPress: applyListFormat },
];
class RichTextExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
      title:'',
      shouldRenderButtons: true
    }
  }
  componentDidMount() {
    // alert("mounted")
    // shortUrl.short('https://google.com', function(err, url){
    //   alert(url);
    // });
  }
  submitPost = () => {
    post = this.state.post;
    title = this.state.title;
    // alert("uploading...")
    // var i = 0;
    // var imgs = [];
    // var uploadedImgs = [];

    // var str = this.state.post;

    // if(str.includes("[IMG]")) {
    //   while (str.search("content://") != -1) {
    //     var uri = str.substring(
    //         str.lastIndexOf("]") + 2,
    //         str.lastIndexOf(")")
    //     )
    //     imgs.push(uri)
    //     str = str.replace(uri, i++)
    // }
    // }

    // uploadedImgs.map((item, i) => {
    //   str = str.replace(`[IMG](${i})`, `[IMG:${item}]`);
    // })
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
    const { translate, navigation } = this.props

    return (
      <LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
        <MainHeader navigation={navigation} />
        <Button onPress={this.submitPost} style={{ width, backgroundColor: "#6e2edd", justifyContent: "center", alignContent: "center" }}>
          <FontedText style={{ color: '#ffffff', textAlign: "center", fontSize: 18 }} text={translate('submit')}/>
        </Button>
        <View style={styles.container}>
          <FontedInput style={{ fontSize: 28, fontWeight: "bold",textAlign:'center', color: "#6e2edd", borderBottomWidth: 0 }} placeholder="post title" value={this.state.title} onChangeText={(title)=>{
            this.setState({title})
          }} />
          <MarkdownEditor markdownButton={this.defaultMarkdownButton} onMarkdownChange={str => this.onStrChange(str)} Formats={CUSTOM_Formats} />
        </View>
        {
          this.state.post === "" ? <View style={{ width, height: 50, backgroundColor: "#ffffff", position: "absolute", zIndex: 1, bottom: 0 }}></View> : null
        }
        </LazyContainer>
    );
  }
}
const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})
export default connect(mapStateToProps)(RichTextExample)

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
