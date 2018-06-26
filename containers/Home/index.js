import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { Container } from 'native-base';
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import Server from '../../constants/Server'

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [

			]
		}

	}
	componentDidMount(){
    fetch(Server.base_url+'/api/v1/Categories?parent_id=0').then(res => res.json())
    .then(data =>{
      this.setState({categories:data.response})
    })
  }


	renderCategory = (item, index) => {
		return (
			<TouchableOpacity
			onPress={()=> {this.props.navigation.navigate('CategoriesPlaces',{category_id:item.id})}}
				style={{ flex: 1, height: 250, borderRadius: 10, marginHorizontal: 5, backgroundColor: 'white' }}>
				<Image
					resizeMode='cover'
					style={{ flex: 0.8, borderTopLeftRadius: 10, borderTopRightRadius: 13 }}
					source={{ uri: item.image }}
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
