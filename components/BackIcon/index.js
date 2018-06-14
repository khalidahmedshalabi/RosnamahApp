import React from 'react'
import { Platform, I18nManager } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'

export default BackIcon = ({ color, style, size }) => {
	// Gives the correct icon based on current language settings (RTL or LTR)
	determineAppropriateIcon = () => {
		let direction = I18nManager.isRTL ? 'forward' : 'back';
		return (Platform.OS == 'ios') ? (`ios-arrow-${direction}`) : (`md-arrow-${direction}`);
	} 

    return (
		<Ionicons
			name={this.determineAppropriateIcon()}
			size={size}
			color={color}
			style={[styles.icon, style]} />
	)
}