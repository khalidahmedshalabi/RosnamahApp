import React, { Component } from 'react';
import { View, StatusBar, Modal, TouchableOpacity, I18nManager } from 'react-native';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Container, Text, Content, Form, Item, Input, Label, Button } from 'native-base';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontedInput from '../../components/FontedInput';
import FontedText from '../../components/FontedText';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { bgColor, secondColor, mainColor } from '../../constants/Colors';

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
				{this.PrivacyModal()}
				{this.TermsModal()}
				<Form style={{
					marginHorizontal: 20
				}} >
					{/* <Text style={ styles.title } >{ translate('signup_title') }</Text> */}
					<View style={{ flex: 0.3, justifyContent: 'center', paddingHorizontal: 10 }}>
					<FontedText 
						text={translate('signup_title')}
						style={{
							color: 'black',
							fontSize: I18nManager.isRTL ? 50 : 70,
							fontWeight: 'normal',
							textAlign: 'center',
						}} />
				</View>
					<Item>
						<SimpleLineIcons name='user' size={26} style={{ marginRight: 12 }} />
						<FontedInput style={{ fontSize: 15 }} placeholder={translate('signup_username_input')} />
					</Item>
					<Item>
						<SimpleLineIcons name='envelope' size={26} style={{ marginRight: 12 }} />
						<FontedInput style={{ fontSize: 15 }} placeholder={translate('signup_email_input')} />
					</Item>
					<Item>
						<SimpleLineIcons name='lock' size={26} style={{ marginRight: 12 }} />
						<FontedInput style={{ fontSize: 15 }} placeholder={translate('signup_password_input')} secureTextEntry={true} />
					</Item>
					<Item last>
						<SimpleLineIcons name='lock' size={26} style={{ marginRight: 12 }} />
						<FontedInput style={{ fontSize: 15 }} placeholder={translate('signup_password_retype_input')} secureTextEntry={true} />
					</Item>
					<View style={ styles.footer } >
						<Button rounded style={styles.signupBtn} onPress={() => navigation.navigate('PhoneVerification')} >
						<Text style={ styles.footerTxt } >{ translate('signup_btn') }</Text>
					</Button>
					<TouchableOpacity onPress={() => navigation.navigate('Login')} ><Text style={ styles.haveAnAcc } >{ translate('signup_have_acc') }</Text></TouchableOpacity>
					<Text style={ styles.privacyPolicay } >{ translate('privacy_one') } <Text onPress={() => this.setState({ TermsModalVisible: true })} style={{ color: mainColor, fontSize: 17 }} >{ translate('privacy_two') }</Text> & <Text onPress={() => this.setState({ PrivacyModalVisible: true })} style={{ color: mainColor, fontSize: 17 }} >{ translate('privacy_three') }</Text></Text>
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