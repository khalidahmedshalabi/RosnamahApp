import React, { Component } from 'react'
import { TouchableOpacity, View, TouchableWithoutFeedback, Text } from 'react-native'
import { Body, Left, Right, Header } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { mainColor, secondColor } from '../../constants/Colors';

export default class MainHeader extends Component {
	render() {
		return (
			<Header
				noShadow={true}
				androidStatusBarColor={secondColor}
				iosBarStyle='light-content'
				style={{
					backgroundColor: mainColor,
				}}>
				<Left style={{ flex: 0.16 }}>
					<TouchableOpacity
						//onPress={() => this.props.navigation.toggleDrawer()}>
						onPress={() => { }}>
						<FontAwesome name='bars' size={22} color='white' />
					</TouchableOpacity>
				</Left>

				<Body style={{ flex: 0.8 }}>
					<TouchableWithoutFeedback 
						//onPress={() => this.props.navigation.navigate('Search')}
						onPress={() => {}}>
						<View 
							style={{
								width: '100%',
								flexDirection: 'row',
								marginLeft: 8,
								backgroundColor: '#f2f2f2',
								borderRadius: 10,
								paddingHorizontal: 10,
								paddingVertical: 8
							}}>
							<Ionicons color='#818181' name='ios-search' size={26} style={{ marginRight: 10 }} />
							<Text
								style={{ color: '#a8a8a8', fontSize: 17 }}
							>بحث</Text>
						</View>

					</TouchableWithoutFeedback>
				</Body>

				<Right style={{ flex: 0.07 }} />
			</Header>
		)
	}
}