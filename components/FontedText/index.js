import React from 'react'
import { Text, I18nManager } from 'react-native'

export default (props) => (
	<Text
		{...props}
		style={[props.style, {
			fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_light'
		}] }
		>{props.text}</Text>
)