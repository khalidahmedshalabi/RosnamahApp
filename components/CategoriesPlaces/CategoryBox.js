import React,{ Component }  from 'react'
import { Platform, I18nManager } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import { bgColor, secondColor,mainColor,borderColor,headerColor } from '../../constants/Colors';
import FontedText from '../FontedText';

import  {ListView,ImageBackground,Divider,Title,Subtitle,Tile} from '@shoutem/ui'

export default class CategoryBox extends Component{
	// Gives the correct icon based on current language settings (RTL or LTR)
	render() {
    return (
		<View
			style={{ flex: 1,backgroundColor:'white' }}>

			<ImageBackground
					styleName="large-ultra-wide"
					source={{uri: this.props.image}}
			>
					<Tile>
					<FontedText style={{ flex:1,color: 'white', fontSize: 25,fontWeight:'bold' }} text={this.props.title}></FontedText>
					</Tile>
			</ImageBackground>
			<Divider styleName="line"/>

		</View>
	)
	}
}
