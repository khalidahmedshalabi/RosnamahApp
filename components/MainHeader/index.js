import React, { Component } from 'react'
import { TouchableOpacity, View, TouchableWithoutFeedback, Text } from 'react-native'
import { Body, Left, Right, Header } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { mainColor } from '../../constants/Colors';
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import FontedText from '../FontedText';

class MainHeader extends Component {
	render() {
		const { translate } = this.props

		return (
			<Header
				noShadow={true}
				androidStatusBarColor='#f2f2f2'
				iosBarStyle='dark-content'
				style={{
					backgroundColor: 'white',
				}}>
				<Left style={{ flex: 0.16 }}>
					<TouchableOpacity
						onPress={() => this.props.navigation.toggleDrawer()}>
						
						<FontAwesome name='bars' size={22} color={mainColor} />
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
							<Ionicons color='#999999' name='ios-search' size={26} style={{ marginRight: 10 }} />
							<FontedText
								text={translate('SearchBarText')}
								style={{ color: '#a8a8a8', fontSize: 17 }} />
						</View>

					</TouchableWithoutFeedback>
				</Body>

				<Right style={{ flex: 0.07 }} />
			</Header>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(MainHeader)