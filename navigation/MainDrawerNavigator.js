import React from 'react';
import { I18nManager } from 'react-native'
import { DrawerNavigator, createStackNavigator } from 'react-navigation';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { mainColor } from '../constants/Colors'
import MainHeader from '../components/MainHeader'

import Home from '../containers/Home'

const MainDrawerNavigator = DrawerNavigator({

	Home: {
		screen: Home, navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<EvilIcons name='user' color={mainColor} size={28} tintColor={tintColor} />
			),
		}
	},

}, {
		drawerPosition: I18nManager.isRTL ? 'right' : 'left',
		contentOptions: {
			labelStyle: { color: 'black', fontWeight: 'normal' },
			activeTintColor: 'red',
			iconContainerStyle: {
				opacity: 1,
				marginRight: 0,
			}
		}
});

const wrapper = createStackNavigator({
	DrawerWrapper: { 
		screen: MainDrawerNavigator,
		navigationOptions: (props) => ({
			header: null
		})
	},
})
export default wrapper;