import React from 'react'
import { I18nManager } from 'react-native'
import { Input } from 'native-base';

export default (props) => (
	<Input
		{...props}
		style={[props.style, {
			fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_light'
		}] }
		/>
)