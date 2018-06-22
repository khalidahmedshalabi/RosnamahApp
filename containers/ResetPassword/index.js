import React, { Component } from 'react'
import { View, StatusBar, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { Container, Item, Button } from 'native-base';
import { bgColor, secondColor, mainColor } from '../../constants/Colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontedInput from '../../components/FontedInput';
import FontedText from '../../components/FontedText';

class Login extends Component {
	onLogin = () => {
		this.props.setLoggedIn(true)
	}

	render() {
		const { translate, skipLogin, navigation } = this.props

		return (
			<Container style={{ backgroundColor: 'white' }}>
				<StatusBar
					backgroundColor="white"
					barStyle="dark-content"
				/>

				<View style={{ flex: 0.3, justifyContent: 'center', paddingHorizontal: 10 }}>
					<FontedText 
						text={translate('new_password_title')}
						style={{
							color: 'black',
							fontSize: I18nManager.isRTL ? 50 : 70,
							fontWeight: 'normal',
							textAlign: 'center',
						}} />
				</View>

				<View style={{ flex: 0.6, paddingHorizontal: 65}}>

					<Item>
						<SimpleLineIcons name='lock' size={26} style={{ marginRight: 12 }} />
						<FontedInput style={{ fontSize: 15 }} placeholder={translate('Password')} secureTextEntry={true} />
					</Item>

					<Item>
						<SimpleLineIcons name='lock' size={26} style={{ marginRight: 12 }} />
						<FontedInput style={{ fontSize: 15 }} placeholder={translate('new_password_sec_input')} secureTextEntry={true} />
					</Item>

					<View style={{ marginTop: 50, justifyContent: 'space-between' }}>
						<Button
							full
							onPress={this.onLogin}
							style={{ 
								backgroundColor: mainColor, 
								//elevation: 0, 
								borderRadius: 20, 
								paddingVertical: 24, 
								paddingHorizontal: 10,
								marginBottom: 15
							}}
							>
							<FontedText 
								style={{ color: 'white', fontSize: 19 }}
								text={translate('new_password_btn')} />
						</Button>
					</View>
				</View>

			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('../../redux/LoginRedux.js');
	return {
		...ownProps,
		...stateProps,
		skipLogin: (login) => actions.skipLogin(dispatch, login),
		setLoggedIn: (logged_in) => actions.setLoggedIn(dispatch, logged_in),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Login)