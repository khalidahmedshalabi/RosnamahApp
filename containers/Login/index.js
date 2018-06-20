import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { Container, Item, Button } from 'native-base';
import { bgColor, secondColor, mainColor } from '../../constants/Colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontedInput from '../../components/FontedInput';
import FontedText from '../../components/FontedText';

class Login extends Component {
	render() {
		const { translate } = this.props

		return (
			<Container style={{ backgroundColor: 'white' }}>
				<View style={{ flex: 0.3 }}>

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
							style={{ 
								backgroundColor: mainColor, 
								elevation: 0, 
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
							style={{
								borderColor: mainColor,
								borderWidth: 1,
								elevation: 0,
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

export default connect(mapStateToProps)(Login)