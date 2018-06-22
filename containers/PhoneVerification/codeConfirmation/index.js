import React, { Component } from 'react';
import { View, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Container, Text, Content, Form, Item, Input, Label, Button } from 'native-base';
import styles from './styles';
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown'

class codeConfirmation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			resend: false,
		}
	}

	shouldResendCode = () => {
		if(this.state.resend)
			return <TouchableOpacity onPress={this.resendCode} ><Text>{this.props.translate('Resend')}</Text></TouchableOpacity>
		else
			return (
				<TimerCountdown
					initialSecondsRemaining={30000}
					onTick={() => {}}
					onTimeElapsed={() => this.setState({ resend: true })}
					allowFontScaling={true}
					style={{ fontSize: 20 }}
				/>
			)
	}

	resendCode = () => {
		// ..
	}

	_onFulfill(code) {
		// TODO: call API to check code here
		// If code does not match, clear input with: this.refs.codeInputRef1.clear()
		if (code == 'Q234E') {
		  Alert.alert(
			'Confirmation Code',
			'Successful!',
			[{text: 'OK'}],
			{ cancelable: false }
		  );
		} else {
		  Alert.alert(
			'Confirmation Code',
			'Code not match!',
			[{text: 'OK'}],
			{ cancelable: false }
		  );
		  
		  this.refs.codeInputRef1.clear();
		}
	  }
	  
	  _onFinishCheckingCode1(isValid) {
		console.log(isValid);
		if (!isValid) {
		  Alert.alert(
			'Confirmation Code',
			'Code not match!',
			[{text: 'OK'}],
			{ cancelable: false }
		  );
		} else {
		  Alert.alert(
			'Confirmation Code',
			'Successful!',
			[{text: 'OK'}],
			{ cancelable: false }
		  );
		}
	  }
	  
	  _onFinishCheckingCode2(isValid, code) {
		console.log(isValid);
		if (!isValid) {
		  Alert.alert(
			'Confirmation Code',
			'Code not match!',
			[{text: 'OK'}],
			{ cancelable: false }
		  );
		} else {
		  this.setState({ code });
		  Alert.alert(
			'Confirmation Code',
			'Successful!',
			[{text: 'OK'}],
			{ cancelable: false }
		  );
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
					paddingTop: 80,
					backgroundColor: '#fff'
				}} >
				<Form style={{
					marginHorizontal: 20
				}} >
					<Text style={ styles.title } >{ translate('Enter_verification_code') }</Text>
					<CodeInput
					ref="codeInputRef2"
					compareWithCode='AsDW2'
					activeColor='#FF2A65'
					inactiveColor='#FF2A65'
					autoFocus={true}
					ignoreCase={true}
					inputPosition='center'
					size={50}
					onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
					containerStyle={{ marginTop: 30 }}
					codeInputStyle={{ borderWidth: 1.5 }}
					/>
				
					<View style={ styles.footer } >
						<Button rounded style={ styles.signupBtn } onPress={() => navigation.navigate('ResetPassword')} >
							<Text style={ styles.footerTxt } >{ translate('Phone_verification_verify_btn') }</Text>
						</Button>
							<View style={{
								marginTop: 50
							}} >{this.shouldResendCode()}</View>
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

export default connect(mapStateToProps)(codeConfirmation)