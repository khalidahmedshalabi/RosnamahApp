import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Container, Text, Content, Form, Item, Input, Label, Button } from 'native-base';
import styles from './styles';
import CountryPicker from 'react-native-country-picker-modal'
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
import isNumeric from '../../utils/Number';
import { POST } from "../../utils/Network"

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cca2: 'JO',
			callingCode: '962',
			number: null,
			fetching: false
		}
	}
	validNumber = () => {
		this.setState({ fetching: true })
		const { number, callingCode, cca2 } = this.state;
		const { translate, navigation, setAuthToken, setLoggedIn } = this.props;
		const { name, email, password } = navigation.getParam("user");
		if(isNumeric(number)) {
			POST("Signup", {
				name,
				email,
				phone: `${callingCode}${number}`,
				password
			}, res => {
				if(res.status === 200) {
					console.log("done::::")
					console.log(res.data)
					setAuthToken(res.data.Authorization);
					navigation.navigate('codeConfirmation')
				} else {
					// handle errs here.....
					console.log("error::::")
					console.log(res);
				}
			}, err => console.log(err))
		} else {
			alert(translate('error_wrong_phone'))
			this.setState({ fetching: false })
		}
	}
	render () {
		const { translate, navigation } = this.props
		return (
			<Container style={styles.container} >
				<StatusBar
					backgroundColor="white"
					barStyle="dark-content"
				/>
				<Content style={{
					paddingTop: 80
				}} >
				<Form style={{
					marginHorizontal: 20
				}} >
					<Text style={ styles.title } >{ translate('Phone_verification_title') }</Text>
					<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
						<View style={{ flex: .1, justifyContent: 'center', alignItems: 'center' }} >
							<CountryPicker
								style={{ flex: 1 }}
								flagType='flat'
								filterable={true}
								closeable={true}
								filterPlaceholder={translate('SearchCountryCode')}
								autoFocusFilter={false}
								onChange={value => {
									this.setState({
										cca2: value.cca2, callingCode: value.callingCode,
									})
								}}
								cca2={this.state.cca2}
								translation="eng"
							/>
						</View>

						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							<Item floatingLabel style={{ flex: 1, }}>
								<Label>{'     ' + translate('Phone_verification_phone_input')}</Label>
								<Input
									ref='mobileNo'
									keyboardType="numeric"
									onChangeText={number => this.setState({ number })}
									style={ styles.input }
								/>
							</Item>
						</View>
					</View>
					<View style={ styles.footer } >
					<Button rounded style={ styles.signupBtn } disabled={this.state.fetching} onPress={this.validNumber} >
						{
							this.state.fetching ? <ActivityIndicator size="large" color="#ffffff" /> : <Text style={ styles.footerTxt } >{ translate('Phone_verification_verify_btn') }</Text>
						}
					</Button>
					{/* <Text style={ styles.haveAnAcc } >{ translate('Phone_verification_skip') }</Text> */}
					<Text style={ styles.privacyPolicay } >{ translate('Phone_verification_tip') }</Text>
					</View>
				</Form>
				</Content>
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

export default connect(mapStateToProps, undefined, mergeProps)(Signup)
