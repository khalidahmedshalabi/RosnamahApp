import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import MainDrawerNavigator from './MainDrawerNavigator';
import CategoriesPlaces from '../containers/CategoriesPlaces';
import ForumCategories from '../containers/ForumCategories';
import ForumPosts from '../containers/ForumPosts';
import SinglePlace from '../containers/SinglePlace';
import SinglePost from '../containers/SinglePost';
import Signup from '../containers/Signup'
import Login from '../containers/Login'
import PhoneVerification from '../containers/PhoneVerification'
import codeConfirmation from '../containers/PhoneVerification/codeConfirmation'
import ResetPassword from '../containers/ResetPassword'
import Settings from '../containers/Settings';
import AboutUs from '../containers/AboutUs';
import Search from '../containers/Search';

// This is the core of the navigator: route configs, etc...
const RootNavigatorCore = ({ screenProps, initialRouteName }) => {
	const routeConfigs = {
		MainDrawerNavigator: {screen: MainDrawerNavigator},
		ForumCategories: {screen: ForumCategories},
		ForumPosts: {screen: ForumPosts},
		SinglePlace: {screen: SinglePlace},
		AboutUs: {screen: AboutUs},
		SinglePost: {screen: SinglePost},
		Login: {screen: Login},
		CategoriesPlaces: {screen: CategoriesPlaces},
		Signup: {screen: Signup},
		PhoneVerification: {screen: PhoneVerification},
		codeConfirmation: {screen: codeConfirmation},
		ResetPassword: {screen: ResetPassword},
		Settings: {screen: Settings},
		Search: { screen: Search },
	};

	const stackNavigatorConfigs = {
		initialRouteName, // this is passed to the navigator (see RootNavigation below)
		navigationOptions: () => ({
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
const RootNavigation = ({ screenProps, logged_in, skipped_login, }) => (
	<RootNavigatorCore
		// Pass screen props normally
		screenProps={screenProps}

		// Determine what the initial route screen is based on first-run rules
		initialRouteName={
			(skipped_login || logged_in) ?
				'MainDrawerNavigator'
				:
				'Login'
		} />
);

// Map Redux state to this component's props
const mapStateToProps = (state) => ({
	skipped_login: state.login ? state.login.skipped_login : false,
	logged_in: state.login ? state.login.logged_in : false,
})

export default connect(mapStateToProps)(RootNavigation)
