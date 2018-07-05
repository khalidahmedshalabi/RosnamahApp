import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import FontedText from '../../components/FontedText';

export default CategoryCard = (props) => {
	const { item, navigation } = props;

	return (
		<TouchableOpacity
			onPress={() => { navigation.navigate('CategoriesPlaces', { category_id: item.id }) }}
			style={{ flex: 1, height: 250, borderRadius: 10, marginHorizontal: 5, backgroundColor: 'white' }}>
			<Image
				resizeMode='cover'
				style={{ flex: 0.8, borderTopLeftRadius: 10, borderTopRightRadius: 13 }}
				source={{ uri: item.image }}
			/>

			<View style={{ flex: 0.2, paddingHorizontal: 12, justifyContent: 'center' }}>
				<FontedText style={{ color: '#515254', fontSize: 17 }} text={item.name} />
			</View>
		</TouchableOpacity>
	)
}