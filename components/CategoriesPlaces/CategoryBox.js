import React,{ Component }  from 'react'
import { Platform, I18nManager } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import { bgColor, secondColor,mainColor,borderColor,headerColor } from '../../constants/Colors';


export default class CategoryBox extends Component{
	// Gives the correct icon based on current language settings (RTL or LTR)
	render() {
    return (
		<TouchableOpacity
			style={{ flex: 1,height:250, borderRadius: 10, marginHorizontal: 5,backgroundColor:'white' }}>
			<Image
				resizeMode='cover'
				style={{ flex: 1  }}
				source={{ uri: this.props.image }}
				/>
			<View style={{justifyContent: 'center',height:100,borderColor:borderColor,borderWidth:.2  }}>
				<Text style={{ flex:.4, paddingHorizontal: 27 ,color: headerColor, fontSize: 20,fontWeight:'bold' }}>{this.props.title}</Text>
				<Text style={{flex:.2,paddingHorizontal: 26, color: 'gray', fontSize: 15 }}>{this.props.title}</Text>
			</View>

		</TouchableOpacity>
	)
	}
}
