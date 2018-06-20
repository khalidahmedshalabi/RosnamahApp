import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Container, Text, Content, Form, Item, Input, Label, Button } from 'native-base';
import styles from './styles';

class Signup extends Component {
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
					<Text style={{ 
						fontSize: 70,
						fontWeight: 'normal',
						textAlign: 'center',
						fontFamily: 'quicksand_light'
					 }} >Create an account</Text>
					<Item floatingLabel>
					<Label>     Username</Label>
					<Input style={{
						fontFamily: 'quicksand_light',
					}} />
					</Item>
					<Item floatingLabel>
					<Label>     Email</Label>
					<Input />
					</Item>
					<Item floatingLabel>
					<Label>     Password</Label>
					<Input />
					</Item>
					<Item floatingLabel last>
					<Label>     Retype Password</Label>
					<Input />
					</Item>
					<View style={{
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: 40
					}} >
					<Button rounded style={{
						backgroundColor: '#FF2A65',
						paddingHorizontal: 80,
						paddingVertical: 25
					}} >
						<Text style={{
							fontFamily: 'quicksand_regular',
							fontSize: 20,
						}} >Sign Up</Text>
					</Button>
					<Text style={{
							fontFamily: 'quicksand_regular',
							fontSize: 20,
						}} >Have an account?</Text>
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