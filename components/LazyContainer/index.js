import React, { Component } from 'react';
import { 
	View,
	ActivityIndicator,
	StyleSheet
} from 'react-native';

import { mainColor } from '../../constants/Colors';

export default class LazyContainer extends Component {
	state = { isMounting: true };

	componentDidMount() {
		requestAnimationFrame(() => this.setState({ isMounting: false }));
	}

	render() {
		if (this.state.isMounting) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={mainColor} />
				</View>
			);
		}

		const {
			style,
			children,
			...props
		} = this.props;
		
		return (
			<View
				style={style}
				{...props}
			>
				{children}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	loadingContainer: {
		backgroundColor: 'white',
		justifyContent: 'center',
		flex: 1,
		alignItems: 'center',
	},
});