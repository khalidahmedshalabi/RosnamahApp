import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';

export default class Template extends Component {
	render () {
		const { translate } = this.props

		return (
			<View>
				{/*		translate() gets the value of "Hello" that is in constants/Languages.js	*/}
				<Text>{translate('Hello')}</Text>
				<Text>Khalid</Text>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(Template)