import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { Container } from 'native-base';
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'

class Home extends Component {
	state = {
		categories: [
			{
				key: '1',
				name: 'Saudi Arabia',
				img: 'http://saudiexpatriate.com/wp-content/uploads/2016/11/Kingdom-Centre-Tower-Riyadh-Top-Shopping-Malls-in-Saudi-Arabia-SaudiExpatriate.com_.png'
			},
			{
				key: '2',
				name: 'Russia',
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

	renderCategory = (item, index) => {
		return (
			<TouchableOpacity
				style={{ flex: 1, height: 250, borderRadius: 10, marginHorizontal: 5, backgroundColor: 'white' }}>
				<Image
					resizeMode='cover'
					style={{ flex: 0.8, borderTopLeftRadius: 10, borderTopRightRadius: 13 }}
					source={{ uri: item.img }} 
					/>
				
				<View style={{ flex: 0.2, paddingHorizontal: 12, justifyContent: 'center' }}>
					<Text style={{ color: '#515254', fontSize: 17 }}>{item.name}</Text>
				</View>
			</TouchableOpacity>
		)
	} 

	render () {
		const { translate, navigation } = this.props

		return (
			<Container style={{ backgroundColor: bgColor }}>
				<MainHeader navigation={navigation} />
				<FlatList
					contentContainerStyle={{ paddingVertical: 12 }}
					numColumns={2}
					data={this.state.categories}
					style={{ flex: 1 }}
					ItemSeparatorComponent={
						() => <View style={{ height: 12, backgroundColor: 'transparent' }}></View>
					}
					renderItem={({ item, index }) => this.renderCategory(item, index)}
				/>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(Home)