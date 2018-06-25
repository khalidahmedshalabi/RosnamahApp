import React, { Component } from 'react'
import { View, StatusBar, TouchableOpacity, Text, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { Container, Button, Content } from 'native-base';
import Modal from "react-native-modal"
import DatePicker from 'react-native-datepicker'
import ModalSelector from 'react-native-modal-selector'
import { bgColor, mainColor } from '../../constants/Colors';

import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontedInput from '../../components/FontedInput';
import FontedText from '../../components/FontedText';
import styles from './styles';
import { POST } from '../../utils/Network';

class Settings extends Component {
	constructor(props) {
		super(props)

		const { bio, name, isMale, birthdate, profile_img_url, translate, currLang } = this.props;
		
		this.state = {
			accountModalShown: false,
			newAccountSettingValue: '',

			// Reducers
			name,
			bio,
			birthdate,
			profile_img_url,
			isMale,
			language: currLang.label,

			// is setting changed ?
			didNameChange: false,
			didBioChange: false,
			didBirthdateChange: false,
			didGenderChange: false,
			didLanguageChange: false
		}
	}

	renderProfileImage = () => {
		const { profile_img_url } = this.props;

		if(profile_img_url) {
			return (
				<View>
					<Image
						source={{ uri: profile_img_url }}
						style={{
							width: 110,
							height: 110,
							borderRadius: 55,
						}}/>

					<TouchableOpacity
						style={{
							position: 'absolute',
							bottom: 0,
							right: 0,
							backgroundColor: mainColor,
							padding: 10,
							borderRadius: 10
						}}>
						<Entypo
							color='white'
							name='camera'
							size={22} />
					</TouchableOpacity>
				</View>
			)
		}
		else {
			return (
				<View
					style={{
						width: 110,
						height: 110,
						borderRadius: 55,
						backgroundColor: '#333333',
					}}>
					<TouchableOpacity
						style={{
							position: 'absolute',
							bottom: 0,
							right: 0,
							backgroundColor: mainColor,
							padding: 10,
							borderRadius: 10
						}}>
						<Entypo
							color='white'
							name='camera'
							size={22} />
					</TouchableOpacity>
				</View>
			)
		}
	}

	onSaveSettings = () => {
		const { didNameChange, didBioChange, didBirthdateChange, didGenderChange, didLanguageChange } = this.state

		let 
			settings_to_update = {},
			didAnySettingChange = false

		if (didBioChange) {
			this.props.setBio(this.state.bio)
			settings_to_update['bio'] = this.state.bio
			didAnySettingChange = true
		}
		if (didNameChange) {
			this.props.setName(this.state.name)
			settings_to_update['name'] = this.state.name
			didAnySettingChange = true
		}
		if (didBirthdateChange) {
			this.props.setBirthDate(this.state.birthdate)
			settings_to_update['birthdate'] = this.state.birthdate
			didAnySettingChange = true
		}
		if (didGenderChange) {
			this.props.setIsMale(this.state.isMale)
			settings_to_update['gender'] = this.state.isMale
			didAnySettingChange = true
		}
		if (didLanguageChange) {
			settings_to_update['language'] = this.state.language_id
			didAnySettingChange = true
		}

		if (didAnySettingChange) {
			POST('Settings',
				settings_to_update,
				res => {
					// on success
				},
				err => {
					// on failure
				},
				true
			)
		}

		navigation.navigate('Home')
	}

	getGenderAsString = () => {
		const { translate } = this.props

		switch (this.state.isMale) {
			case -1: return translate('Unspecified');
			case 0: return translate('Male');
			case 1: return translate('Female');
		}
	}

	accountSettingsModalContent = (account_setting) => {
		const { translate } = this.props

		let account_setting_text
		switch(account_setting) {
			case 0: account_setting_text = translate('NewPhone'); break;
			case 1: account_setting_text = translate('NewEmail'); break;
			case 2: account_setting_text = translate('NewPass'); break;
		}

		return (
			<View style={{
				backgroundColor: 'white',
				borderRadius: 20,
				alignItems: 'center',
				justifyContent: 'center',
				paddingHorizontal: 12,
				paddingVertical: 18
			}}>
				<View
					style={styles.setting_item}>
					<FontedText
						style={styles.setting_text}
						text={account_setting_text} />
					<FontedInput
						defaultValue={this.state.newAccountSettingValue}
						onChangeText={(text) => this.setState({ newAccountSettingValue: text })}
						style={styles.setting_input} />
				</View>

				<Button
					//onPress={}
					style={{
						width: '100%',
						backgroundColor: mainColor,
						borderRadius: 20,
						paddingVertical: 24,
						paddingHorizontal: 10,
						justifyContent: 'center'
					}}
				>
					<FontedText
						style={{ color: 'white', fontSize: 19 }}
						text={translate('Change')} />
				</Button>
			</View>
		)
	}

	accountSettingsModal = () => (
		<Modal
			hideModalContentWhileAnimating={true}
			swipeDirection='down'
			onSwipe={() => this.setState({ accountModalShown: false })}
			onBackdropPress={() => this.setState({ accountModalShown: false })}
			onRequestClose={() => this.setState({ accountModalShown: false })}
			isVisible={this.state.accountModalShown}>
			{this.accountSettingsModalContent(this.state.currentAccountSetting)}
		</Modal>
	)

	showAccountSettingsModal = (account_setting) => {
		this.setState({ currentAccountSetting: account_setting, accountModalShown: true })
	}

	onChangeLanguage = (option) => {
		const {
			switchLanguage,
			currLang
		} = this.props;

		if (option.key == currLang.key) return;

		this.setState({ language: option.label, language_id: option.key, didLanguageChange: true })
		switchLanguage(option)
	}

	render() {
		const { translate, languages_data } = this.props

		const gender_data = [
			{ key: -1, label: translate('Unspecified') },
			{ key: 0, label: translate('Male') },
			{ key: 1, label: translate('Female') },
		];

		return (
			<Container style={{ backgroundColor: bgColor }}>
				<StatusBar
					backgroundColor="white"
					barStyle="dark-content"
				/>
				
				<Content style={{ flex: 0.8 }}>
					<View
						style={{ justifyContent: 'center', alignItems: 'center', padding: 24, zIndex: 1 }}>
						{this.renderProfileImage()}
					</View>

					<View style={{ 
						backgroundColor: 'white', 
						borderRadius: 20, 
						margin: 14, 
						marginTop: -50, 
						padding: 20, 
						paddingTop: 30,
					}}>
						<View
							style={styles.setting_item}>
							<FontedText
								style={styles.setting_text}
								text={translate('signup_username_input')} />
							<FontedInput
								defaultValue={this.state.name}
								onChangeText={(text) => this.setState({ name: text, didNameChange: true })}
								style={styles.setting_input} />
						</View>

						<View style={styles.setting_item}>
							<FontedText
								text={translate('Gender')}
								style={styles.setting_text}
							/>

							<View
								style={styles.setting_input}>
								<ModalSelector
									data={gender_data}
									initValue=""
									supportedOrientations={['portrait']}
									accessible={true}
									//scrollViewAccessibilityLabel={'Scrollable options'}
									//cancelButtonAccessibilityLabel={'Cancel Button'}
									cancelText={translate('Cancel')}
									cancelTextStyle={{ color: 'red' }}
									optionTextStyle={{ color: '#575757' }}
									selectTextStyle={{ color: '#575757' }}
									touchableStyle={{ flex: 1 }}
									childrenContainerStyle={{ borderWidth: 0, margin: 0, padding: 0, height: 50, justifyContent: 'center' }}
									onChange={(option) => { this.setState({ isMale: option.key, didGenderChange: true }) }}>
									<FontedText
										text={this.getGenderAsString()}
										style={{ color: 'black', fontSize: 17 }} 
										/>
								</ModalSelector>
							</View>
						</View>

						<View
							style={styles.setting_item}>
							<FontedText
								style={styles.setting_text}
								text={translate('Bio')} />
							<FontedInput
								defaultValue={this.state.bio}
								onChangeText={(text) => this.setState({ bio: text, didBioChange: true })}
								style={styles.setting_input} />
						</View>

						<View
							style={styles.setting_item}>
							<FontedText
								style={styles.setting_text}
								text={translate('BirthDate')} />

							<View
								style={styles.setting_input}>
								<DatePicker
									style={{ width: '100%' }}
									date={this.state.birthdate}
									mode="date"
									placeholder={translate('Unspecified')}
									format="YYYY-MM-DD"
									minDate="1900-01-01"
									confirmBtnText={translate('Done')}
									cancelBtnText={translate('Cancel')}
									showIcon={false}
									customStyles={{
										dateInput: {
											borderWidth: 0,
											alignItems: 'flex-start',
										},
										dateText: {
											fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_light',
											color: 'black',
											fontSize: 17,
										},
										placeholderText: {
											fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_light',
											color: 'black',
											fontSize: 17,
										}
									}}
									onDateChange={(date) => {
										this.setState({ birthdate: date, didBirthdateChange: true })
									}}
								/>
							</View>
						</View>

						<View style={styles.setting_item}>
							<FontedText
								text={translate('Language')}
								style={styles.setting_text}
							/>

							<View
								style={styles.setting_input}>
								<ModalSelector
									data={languages_data}
									initValue=""
									supportedOrientations={['portrait']}
									accessible={true}
									//scrollViewAccessibilityLabel={'Scrollable options'}
									//cancelButtonAccessibilityLabel={'Cancel Button'}
									cancelText={translate('Cancel')}
									cancelTextStyle={{ color: 'red' }}
									optionTextStyle={{ color: '#575757' }}
									selectTextStyle={{ color: '#575757', fontWeight: 'normal', }}
									touchableStyle={{ flex: 1 }}
									childrenContainerStyle={{ borderWidth: 0, margin: 0, padding: 0, height: 50, justifyContent: 'center' }}
									onChange={(option) => this.onChangeLanguage(option)}>
									<FontedText
										text={this.state.language}
										style={{ color: 'black', fontSize: 17 }}
									/>
								</ModalSelector>
							</View>
						</View>

						<TouchableOpacity
							onPress={() => this.showAccountSettingsModal(0)}
							style={styles.setting_action}>
							<FontedText
								style={styles.setting_action_text}
								text={translate('ChangePhone')} />

							<Ionicons
								name={`ios-arrow-${I18nManager.isRTL ? 'back' : 'forward'}`}
								color={'#575757'}
								size={24} />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => this.showAccountSettingsModal(1)}
							style={styles.setting_action}>
							<FontedText
								style={styles.setting_action_text}
								text={translate('ChangeEmail')} />

							<Ionicons
								name={`ios-arrow-${I18nManager.isRTL ? 'back' : 'forward'}`}
								color={'#575757'}
								size={24} />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => this.showAccountSettingsModal(2)}
							style={styles.setting_action}>
							<FontedText
								style={styles.setting_action_text}
								text={translate('ChangePass')} />
							
							<Ionicons
								name={`ios-arrow-${I18nManager.isRTL ? 'back' : 'forward'}`}
								color={'#575757'}
								size={24} />
						</TouchableOpacity>
					</View>
				</Content>

				<View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10 }}>
					<Button
						onPress={this.onSaveSettings}
						style={{
							width: '100%',
							backgroundColor: mainColor,
							borderRadius: 20,
							paddingVertical: 24,
							paddingHorizontal: 10,
							justifyContent: 'center'
						}}
					>
						<FontedText
							style={{ color: 'white', fontSize: 19 }}
							text={translate('Save')} />
					</Button>
				</View>

				{this.accountSettingsModal()}
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
	bio: state.settings.bio || null,
	name: state.settings.name || null,
	profile_img_url: state.settings.profile_img_url || null,
	isMale: state.settings.isMale || -1,
	birthdate: state.settings.birthdate || null,
	currLang: state.language.currLang || null,
	languages_data: state.language.languages_data || null,
})

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('../../redux/SettingsRedux.js');
	const langReducerActions = require('../../redux/LangRedux.js').actions;
	return {
		...ownProps,
		...stateProps,
		setBio: (bio) => actions.setBio(dispatch, bio),
		setName: (name) => actions.setName(dispatch, name),
		setProfileImg: (profile_img_url) => actions.setProfileImg(dispatch, profile_img_url),
		setIsMale: (isMale) => actions.setIsMale(dispatch, isMale),
		setBirthDate: (birthdate) => actions.setBirthDate(dispatch, birthdate),
		switchLanguage: (lang) => langReducerActions.switchLanguage(dispatch, lang),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Settings)