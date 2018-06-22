import React from 'react'
import { I18nManager } from 'react-native'
import { Input, Right } from 'native-base';

export default (props) => (
	<Input
		{...props}
		style={[props.style, {
			fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_light',
			textAlign: I18nManager.isRTL ? 'right' : 'left',
		}] }
		/>
)