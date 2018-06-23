import React from 'react';
import { I18nManager } from 'react-native'
import { DrawerNavigator, createStackNavigator } from 'react-navigation';
import Octicons from 'react-native-vector-icons/Octicons'
import { mainColor } from '../constants/Colors'
import CustomDrawerContentComponent from './CustomDrawerContent';

import Home from '../containers/Home'

const MainDrawerNavigator = DrawerNavigator({

	Home: {
		screen: Home, navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<Octicons name='home' color={mainColor} size={26} tintColor={tintColor} />
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