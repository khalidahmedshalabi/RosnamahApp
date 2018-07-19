import React from 'react';
import { I18nManager } from 'react-native'
import { createDrawerNavigator, createStackNavigator, } from 'react-navigation';
import { mainColor } from '../constants/Colors'
import CustomDrawerContentComponent from './CustomDrawerContent';

import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import ForumCategories from '../containers/ForumCategories';

import Home from '../containers/Home'
import Settings from '../containers/Settings'
import MyVisits from '../containers/MyVisits';
import FavPlaces from '../containers/FavPlaces';
import AddPlace from '../containers/AddPlace'
import AboutUs from '../containers/AboutUs';
import AddPost from '../containers/AddPost'
import ForumPosts from '../containers/ForumPosts';
import SinglePost from '../containers/SinglePost';
const drawerIconSize = 26

const ForumStack = createStackNavigator({
	Main: {screen: ForumCategories},
	ForumPosts: {screen: ForumPosts},
	SinglePost: {screen: SinglePost},
}, {
	navigationOptions: {
		header: null
	}
})

const MainDrawerNavigator = createDrawerNavigator({

	Home: {
		screen: Home,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<Octicons name='home' color={mainColor} size={drawerIconSize} tintColor={tintColor} />
			),
		}
	},
	Forum: {
		screen: ForumStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<MaterialCommunityIcons name='forum' color={mainColor} size={drawerIconSize} tintColor={tintColor} />
			),
		}
	},
	MyVisits: {
		screen: MyVisits,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<Entypo name='aircraft' color={mainColor} size={drawerIconSize} tintColor={tintColor} />
			),
		}
	},
	AddPlace: {
		screen: AddPlace,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<EvilIcons name='plus' color={mainColor} size={drawerIconSize} tintColor={tintColor} />
			),
		}
	},
	AddPost: {
		screen: AddPost,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<EvilIcons name='plus' color={mainColor} size={drawerIconSize} tintColor={tintColor} />
			),
		}
	},
	FavPlaces: {
		screen: FavPlaces,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<Octicons name='heart' color={mainColor} size={drawerIconSize} tintColor={tintColor} />
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
	AboutUs: {
		screen: AboutUs,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (
				<Ionicons name='ios-call-outline' color={mainColor} size={drawerIconSize} tintColor={tintColor} />
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
