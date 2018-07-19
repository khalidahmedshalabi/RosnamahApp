import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import styles from './styles'

OfflineSign = ({ translate }) => (
	<View style={styles.container}>
		<Text style={styles.text}>{translate('NoInternetConnection')}</Text>
	</View>
)

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale)
})

export default connect(mapStateToProps)(OfflineSign);