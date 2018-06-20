import React, { Component } from 'react';
import { View, StatusBar, Modal } from 'react-native';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Container, Text, Content, Form, Item, Input, Label, Button } from 'native-base';
import styles from './styles';
import CountryPicker from 'react-native-country-picker-modal'
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance(); 

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cca2: 'JO',
			callingCode: '962',
			number: ''
		}
	}
	validNumber = () => {
		const number = phoneUtil.parseAndKeepRawInput(this.state.number, this.state.cca2.toUpperCase());
		const validation = phoneUtil.isValidNumber(number);
		if(validation)
			// valid...
			alert('valid')
		else	
			// invalid...
			alert('invalid')

	}
	render () {
		const { translate } = this.props
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
								<Input onChangeText={number => this.setState({ number })} style={ styles.input } />
							</Item>
						</View>
					</View>
					<View style={ styles.footer } >
					<Button rounded style={ styles.signupBtn } >
						<Text style={ styles.footerTxt } >{ translate('Phone_verification_verify_btn') }</Text>
					</Button>
					<Text style={ styles.haveAnAcc } >{ translate('Phone_verification_skip') }</Text>
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

export default connect(mapStateToProps)(Signup)