import React, { Component } from 'react';
import { View, StatusBar, Modal } from 'react-native';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Container, Text, Content, Form, Item, Input, Label, Button } from 'native-base';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons'
class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			PrivacyModalVisible: false,
			TermsModalVisible: false,
		}
	}
	PrivacyModal = () => (
		<Modal
          animationType="slide"
          transparent={false}
          visible={this.state.PrivacyModalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
		  <Container>
			  <View style={ styles.closeIconWrapper } >
				<Ionicons onPress={() => this.setState({ PrivacyModalVisible: false })} name='ios-close-circle-outline' size={50} />
			  </View>
            <Content>
              <Text style={ styles.modalTxt } >
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  </Text>

            </Content>
			</Container>
        </Modal>
	)
	TermsModal = () => (
		<Modal
          animationType="slide"
          transparent={false}
          visible={this.state.TermsModalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
		  <Container>
			  <View style={ styles.closeIconWrapper } >
				<Ionicons onPress={() => this.setState({ TermsModalVisible: false })} name='ios-close-circle-outline' size={50} />
			  </View>
            <Content>
              <Text style={ styles.modalTxt } >
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			  </Text>

            </Content>
			</Container>
        </Modal>
	)
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
				{this.PrivacyModal()}
				{this.TermsModal()}
				<Form style={{
					marginHorizontal: 20
				}} >
					<Text style={ styles.title } >{ translate('signup_title') }</Text>
					<Item floatingLabel>
					<Label>{'     ' + translate('signup_username_input')}</Label>
					<Input style={ styles.input } />
					</Item>
					<Item floatingLabel>
					<Label>{'     ' + translate('signup_email_input')}</Label>
					<Input style={ styles.input } />
					</Item>
					<Item floatingLabel>
					<Label>{'     ' + translate('signup_password_input')}</Label>
					<Input style={ styles.input } />
					</Item>
					<Item floatingLabel last>
					<Label>{'     ' + translate('signup_password_retype_input')}</Label>
					<Input style={ styles.input } />
					</Item>
					<View style={ styles.footer } >
					<Button rounded style={ styles.signupBtn } onPress={() => this.props.navigation.navigate('PhoneVerification')} >
						<Text style={ styles.footerTxt } >{ translate('signup_btn') }</Text>
					</Button>
					<Text style={ styles.haveAnAcc } >{ translate('signup_have_acc') }</Text>
					<Text style={ styles.privacyPolicay } >{ translate('privacy_one') } <Text onPress={() => this.setState({ TermsModalVisible: true })} style={{ color: '#FF2A65', fontSize: 17 }} >{ translate('privacy_two') }</Text> & <Text onPress={() => this.setState({ PrivacyModalVisible: true })} style={{ color: '#FF2A65', fontSize: 17 }} >{ translate('privacy_three') }</Text></Text>
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