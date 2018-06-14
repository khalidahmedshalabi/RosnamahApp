import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { mainColor } from '../../constants/Colors';

export default () => (
	<View style={{
		backgroundColor: 'transparent',
		justifyContent: 'center',
		flex: 1,
		alignItems: 'center',
	}}>
		<ActivityIndicator size="large" color={mainColor} />
	</View>
)

// todo: show some useful tip and an activity indicator