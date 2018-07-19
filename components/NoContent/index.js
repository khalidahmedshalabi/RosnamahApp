import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { mainColor } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontedText from '../FontedText';

NoContent = ({ translate }) => (
	<View style={{ backgroundColor: 'white', flex: 1, height: '100%', paddingVertical: 50, justifyContent: 'center', alignItems: 'center' }}>
		<Ionicons name='ios-sad-outline' color={mainColor} size={90} style={{ marginBottom: 50 }} />
		<FontedText 
			text={translate('NoContent')}
			style={{ color: mainColor, fontSize: 40 }} />
	</View>
)

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale)
})

export default connect(mapStateToProps)(NoContent);