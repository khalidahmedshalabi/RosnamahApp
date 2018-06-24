import React from 'react';
import { I18nManager } from 'react-native'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { mainColor } from '../constants/Colors'
import CustomDrawerContentComponent from './CustomDrawerContent';

import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'

import Home from '../containers/Home'
import Settings from '../containers/Settings'

const drawerIconSize = 26

const MainDrawerNavigator = createDrawerNavigator({

	Home: {
		screen: Home, 
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<Octicons name='home' color={mainColor} size={drawerIconSize} tintColor={tintColor} />
			),
		}
	},
	Settings: {
		screen: Settings, 
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<Octicons name='gear' color={mainColor} size={drawerIconSize} tintColor={tintColor} />
			),
		}
	},
	Logout: {
		screen: Home,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<Feather name='log-out' color={mainColor} size={drawerIconSize} tintColor={tintColor} />
			),
		}
	},

}, {
		drawerPosition: I18nManager.isRTL ? 'right' : 'left',
		contentComponent: CustomDrawerContentComponent,
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