import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import MainHeader from '../components/MainHeader'
import Home from '../containers/Home'
import Signup from '../containers/Signup'
import Login from '../containers/Login'
import PhoneVerification from '../containers/PhoneVerification'

// This is the core of the navigator: route configs, etc...
const RootNavigatorCore = ({ screenProps, initialRouteName }) => {
	const routeConfigs = {
		Home: { 
			screen: Home,
			navigationOptions: (props) => ({
				header: <MainHeader {...props} />
			})
		},
		Login: {
			screen: Login,
		},
		Signup: {
			screen: Signup,
		},
		PhoneVerification: {
			screen: PhoneVerification,
		}
	};

	const stackNavigatorConfigs = {
		initialRouteName, // this is passed to the navigator (see RootNavigation below)
		navigationOptions: (props) => ({
			header: null,
			headerTitleStyle: {
				fontWeight: 'normal'
			},
		}),
	};

	const NavigatorWithScreenProps = createStackNavigator(routeConfigs, stackNavigatorConfigs);
	return <NavigatorWithScreenProps screenProps={screenProps} />;
};


// This acts as a wrapper for the navigator
const RootNavigation = ({ initialRouteName, screenProps, seen_intro }) => (
	<RootNavigatorCore
		// Pass screen props normally
		screenProps={screenProps}

		// Determine what the initial route screen is based on first-run rules
		initialRouteName={
			seen_intro ?
				'Home'
				:
				'Home'
		} />
);

// Map Redux state to this component's props
const mapStateToProps = (state) => ({
	seen_intro: state.firstRun ? state.firstRun.seen_intro : false,
})

export default connect(mapStateToProps)(RootNavigation)