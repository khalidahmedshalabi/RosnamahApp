import React, { Component } from 'react'
import { TouchableOpacity, View, TextInput } from 'react-native'
import { Body, Left, Right, Header } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { mainColor } from '../../constants/Colors';

export default class MainHeader extends Component {
	onSearch = () => {

	}

	render() {
		return (
			<Header
				noShadow={true}
				androidStatusBarColor='#052554'
				iosBarStyle='light-content'
				style={{
					backgroundColor: '#02183a',
				}}>
				<Left style={{ flex: 0.16 }}>
					<TouchableOpacity
						//onPress={() => this.props.navigation.toggleDrawer()}>
						onPress={() => { }}>
						<FontAwesome name='bars' size={22} color='white' />
					</TouchableOpacity>
				</Left>

				<Body style={{ flex: 0.8 }}>
					<View style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						backgroundColor: '#f2f2f2',
						borderRadius: 10,
						paddingHorizontal: 10,
						marginVertical: 8,
					}}>
						<Ionicons color='#818181' name='ios-search' size={26} style={{ marginRight: 10 }} />
						<TextInput
							returnKeyType='search'
							underlineColorAndroid='transparent'
							placeholder='بحث'
							placeholderTextColor='#a8a8a8'
							onChangeText={(text) => this.onSearch(text)}
							style={{
								width: '100%',
								color: '#a8a8a8',
								fontSize: 17
							}} />
					</View>
				</Body>

				<Right style={{ flex: 0.09 }} />
			</Header>
		)
	}
}