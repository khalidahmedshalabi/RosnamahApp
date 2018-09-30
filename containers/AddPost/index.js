import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { uploadImage } from '../../utils'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import ImagePicker from 'react-native-image-picker'
import MainHeader from '../../components/MainHeader'
import LazyContainer from '../../components/LazyContainer'
import colors, { bgColor, mainColor } from '../../constants/Colors';

export default class RichTextExample extends Component {
  render() {
    const { navigation } = this.props 
    return (
      <LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
        <View style={styles.container}>
        {/* <TouchableOpacity style={{  }} onPress={() => this._pickImage()} >
          <Text>asklfhalksfh</Text>
        </TouchableOpacity> */}
        <MainHeader navigation={navigation} />
        </View>
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