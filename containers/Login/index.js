import React, { Component } from 'react'
import { View, StatusBar, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { Container, Item, Button } from 'native-base';
import { bgColor, secondColor, mainColor } from '../../constants/Colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
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
						text={translate('Login')}
						style={{
							color: 'black',
							fontSize: I18nManager.isRTL ? 50 : 70,
							fontWeight: 'normal',
							textAlign: 'center',
						}} />
				</View>

				<View style={{ flex: 0.6, paddingHorizontal: 65}}>
					<Item>
						<FontAwesome name='user-o' size={26} style={{ marginRight: 12 }} />
						<FontedInput style={{ fontSize: 15 }} placeholder={translate('EmailOrPhone')} />
					</Item>

					<Item>
						<SimpleLineIcons name='lock' size={26} style={{ marginRight: 12 }} />
						<FontedInput style={{ fontSize: 15 }} placeholder={translate('Password')} secureTextEntry={true} />
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
								text={translate('Login')} />
						</Button>

						<Button
							full
							transparent
							onPress={() => navigation.navigate('Signup')}
							style={{
								borderColor: mainColor,
								borderWidth: 1,
								//elevation: 0,
								borderRadius: 20,
								paddingVertical: 24,
								paddingHorizontal: 10
							}}
						>
							<FontedText
								style={{ color: mainColor, fontSize: 19 }}
								text={translate('CreateAccount')} />
						</Button>
					</View>
				</View>

				<View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
					<Button
						transparent
						style={{
							elevation: 0,
							padding: 8
						}}
					>
						<FontedText
							style={{ color: mainColor, fontSize: 14 }}
							text={translate('ForgotPass')} />
					</Button>

					<Button
						transparent
						onPress={() => skipLogin(true)}
						style={{
							elevation: 0,
							padding: 8
						}}
					>
						<FontedText
							style={{ color: mainColor, fontSize: 14 }}
							text={translate('SkipLogin')} />
					</Button>
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