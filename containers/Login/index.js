import React, { Component } from 'react'
import { View, StatusBar, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { Container, Item, Button } from 'native-base';
import { mainColor } from '../../constants/Colors';
import Toast from 'react-native-easy-toast';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontedInput from '../../components/FontedInput';
import FontedText from '../../components/FontedText';

class Login extends Component {
	state = {
		identifier: '',
		password: '',
	}

	componentDidMount() {
		const { navigation } = this.props;

		if (navigation.state.params) {
			if (navigation.state.params.DoNotSkip) {
				const { skipLogin, setLoggedIn, setAuthToken } = this.props;
				skipLogin(false);
				setLoggedIn(false);
				setAuthToken('')
			}
		}
	}

	onLogin = () => {
		const { password, identifier } = this.state;
		const { translate } = this.props;

		// if (!identifier || !password) {
		// 	this.refs.toast.show(translate('CantHaveEmptyInputs'), 1000);
		// 	return;
		// }

		// POST('Signin', {
		// 	identifier,
		// 	password
		// },
		// 	(response) => {
				const { setAuthToken, setLoggedIn } = this.props;
				// setAuthToken(response.data.auth);
				setLoggedIn(true);
		// 	},
		// 	(error) => {
		// 		console.log(error)

		// 		const { translate } = this.props;
		// 		this.refs.toast.show(translate('NetworkFailure'), 1000);
		// 	},
		// 	false);
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
						onChangeText={(text) => this.setState({ identifier: text })}
						onSubmitEditing={(event) => {
							this.onLogin()
						}}
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
						<FontedInput 
							onChangeText={(text) => this.setState({ password: text })}
							onSubmitEditing={(event) => {
								this.onLogin()
							}}
							style={{ fontSize: 15 }} 
							placeholder={translate('Password')} 
							secureTextEntry={true} />
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
						onPress={() => navigation.navigate('PhoneVerification')}
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

				<Toast ref="toast" />
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
	const userRedux = require('../../redux/UserRedux.js');
	return {
		...ownProps,
		...stateProps,
		skipLogin: (login) => actions.skipLogin(dispatch, login),
		setLoggedIn: (logged_in) => actions.setLoggedIn(dispatch, logged_in),
		setAuthToken: (auth_token) => userRedux.actions.setAuthToken(dispatch, auth_token)
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Login)