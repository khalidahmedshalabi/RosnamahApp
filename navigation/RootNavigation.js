import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Template from '../containers/Template'

// This is the core of the navigator: route configs, etc...
const RootNavigatorCore = ({ screenProps, initialRouteName }) => {
	const routeConfigs = {
		Main: { screen: Template },
		Walkthrough: { screen: Template }
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
				'Main'
				:
				'Walkthrough'
		} />
);

// Map Redux state to this component's props
const mapStateToProps = (state) => ({
	seen_intro: state.firstRun ? state.firstRun.seen_intro : false,
})

import { connect } from 'react-redux';

export default connect(mapStateToProps)(RootNavigation)