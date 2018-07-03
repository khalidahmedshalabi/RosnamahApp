import React,{ Component }  from 'react'
import { Platform, I18nManager } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import { bgColor, secondColor,mainColor,borderColor,headerColor } from '../../constants/Colors';
import FontedText from '../FontedText';


export default class CategoryBox extends Component{
	// Gives the correct icon based on current language settings (RTL or LTR)
	render() {
    return (
		<View
			style={{ flex: 1,height:250, borderRadius: 10, marginHorizontal: 5,backgroundColor:'white' }}>
			<Image
				resizeMode='cover'
				style={{ flex: 1 ,borderRadius:4 }}
				source={{ uri: this.props.image }}
				/>
			<View style={{justifyContent: 'center',height:100,borderColor:borderColor,borderWidth:.2  }}>
				<FontedText style={{ flex:.4, paddingHorizontal: 27 ,color: headerColor, fontSize: 20,fontWeight:'bold' }} text={this.props.title}></FontedText>
				<FontedText style={{flex:.2,paddingHorizontal: 26, color: 'gray', fontSize: 15 }} text={this.props.title}></FontedText>
			</View>

		</View>
	)
	}
}
