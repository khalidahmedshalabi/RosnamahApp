import React, { Component } from 'react'
import { View, StatusBar, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { Container, Item, Button, Content, Label } from 'native-base';
import DatePicker from 'react-native-datepicker'
import ModalSelector from 'react-native-modal-selector'
import { bgColor, mainColor } from '../../constants/Colors';

import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontedInput from '../../components/FontedInput';
import FontedText from '../../components/FontedText';
import styles from './styles';

class Settings extends Component {
	constructor(props) {
		super(props)

		const { bio, name, isMale, birthdate, profile_img_url, translate } = this.props;
	
		this.state = {
			name,
			bio,
			birthdate,
			profile_img_url,
			isMale
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
		const { setBio, setName, setProfileImg, setIsMale, setBirthDate, navigation } = this.props;
		const { bio, name, isMale, birthdate, profile_img_url } = this.state;
		
		setBio(bio)
		setName(name)
		setProfileImg(profile_img_url)
		setBirthDate(birthdate)
		setIsMale(isMale)

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

	render() {
		const { translate } = this.props

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
						<Item
							style={styles.setting_item} 
							floatingLabel>
							<Label>{translate('signup_username_input')}</Label>
							<FontedInput
								defaultValue={this.state.name}
								onChangeText={(text) => this.setState({ name: text })}
								style={{ fontSize: 15 }} />
						</Item>

						<View
							style={styles.setting_item}>
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
								childrenContainerStyle={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									flex: 1,
									paddingBottom: 5,
									paddingLeft: 7,
									borderBottomWidth: 1,
									borderBottomColor: '#d9d5dc'
								}}
								onChange={(option) => { this.setState({ isMale: option.key }) }}>
								<Text style={{ color: '#575757', fontSize: 16, marginRight: 6 }} uppercase={false}>
									{translate('Gender')} {this.getGenderAsString()}
								</Text>

								<Ionicons
									name={'ios-arrow-down'}
									color={'#969696'}
									size={17} />
							</ModalSelector>
						</View>

						<Item
							style={styles.setting_item}
							floatingLabel>
							<Label>{translate('Bio')}</Label>
							<FontedInput
								defaultValue={this.state.bio}
								onChangeText={(text) => this.setState({ bio: text })}
								style={{ fontSize: 15 }} />
						</Item>

						<View
							style={{ marginVertical: 22 }}>
							<DatePicker
								style={{ width: '100%' }}
								date={this.state.birthdate}
								mode="date"
								placeholder={translate('BirthDate')}
								format="YYYY-MM-DD"
								minDate="1900-01-01"
								confirmBtnText={translate('Done')}
								cancelBtnText={translate('Cancel')}
								showIcon={false}
								customStyles={{
									dateInput: {
										borderWidth: 0,
										borderBottomWidth: 1,
										borderBottomColor: '#d9d5dc',
										alignItems: 'flex-start',
									},
									dateText: {
										color: '#575757',
										marginLeft: 7,
									},
									placeholderText: {
										color: '#575757',
										marginLeft: 7,
									}
								}}
								onDateChange={(date) => {
									this.setState({ birthdate: date })
								}}
							/>
						</View>
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
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('../../redux/SettingsRedux.js');
	return {
		...ownProps,
		...stateProps,
		setBio: (bio) => actions.setBio(dispatch, bio),
		setName: (name) => actions.setName(dispatch, name),
		setProfileImg: (profile_img_url) => actions.setProfileImg(dispatch, profile_img_url),
		setIsMale: (isMale) => actions.setIsMale(dispatch, isMale),
		setBirthDate: (birthdate) => actions.setBirthDate(dispatch, birthdate),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Settings)