import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'

class CategoriesPlaces extends Component {
	state = {
		categories: [
			{
				key: '1',
				name: 'Saudi Arabia',
				img: 'https://vacationidea.com/pix/img25Hy8R/articles/best-russia-destinations_f.jpg'
			},
			{
				key: '2',
				name: 'amr',
				img: 'https://vacationidea.com/pix/img25Hy8R/articles/best-russia-destinations_f.jpg'
			},
			{
				key: '3',
				name: 'United States',
				img: 'https://techround.co.uk/wp-content/uploads/2018/04/bridge-2.jpg'
			},
			{
				key: '4',
				name: 'Spain',
				img: 'https://arzotravels.com/wp-content/uploads/2017/11/valencia-Best-places-to-go-in-Spain-1000x666.jpg'
			},
			{
				key: '5',
				name: 'England',
				img: 'http://feelindia.org/wp-content/uploads/2015/11/in-england-best-places-tourist-spots-to-visit-in-england-uk.jpg'
			},
			{
				key: '6',
				name: 'Italy',
				img: 'http://travelsandliving.com/wp-content/uploads/2015/02/best-places-to-visit-in-Italy-Manarola-Liguria-e1423069720386.jpg'
			},
		]
	}



	render () {
		const { translate, navigation } = this.props

		return (
			<LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
				<MainHeader navigation={navigation} />
				<FlatList
					contentContainerStyle={{ paddingVertical: 12 }}
					numColumns={1}
					data={this.state.categories}
					style={{ flex: 1 }}
					ItemSeparatorComponent={
						() => <View style={{ height:10, backgroundColor:'white'  }}></View>
					}
					renderItem={({ item, index }) => (
            <CategoryBox
            title = {item.name}
            image = {item.img}
            />
          )}
				/>
			</LazyContainer>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(CategoriesPlaces)
