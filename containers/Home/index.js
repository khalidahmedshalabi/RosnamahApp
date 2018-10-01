import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { Container } from 'native-base';
import { bgColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import { GET } from '../../utils/Network';
import FontedText from '../../components/FontedText';
import { shouldShowAdMobInterstitial } from '../../utils/AdMob';
import Server from '../../constants/Server';
import axios from 'axios';

//import CategoryBox from '../../components/CategoriesPlaces/CategoryBox';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: [{
id: 1,
name: "Usa",
descc: "librality states",
image: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350"
},
{
id: 6,
name: "حسام",
descc: "شسبشسب",
image: "https://firebasestorage.googleapis.com/v0/b/rosnamahapp.appspot.com/o/categories%2F1535583155199.jpeg?alt=media&token=fb7ebb66-9e47-4228-8388-aa2834b70b51"
},]
		}
	}

	componentDidMount(){
		shouldShowAdMobInterstitial();

		const { currLang } = this.props
		const { code } = currLang
		GET('Categories?parent_id=0&lang='+code,
			res => {
				// on success
				console.log(res)
				this.setState({ categories: res.data.response })
			},
			() => {
			},
			false // should authorise this request?
		)
		// axios.get('http://178.128.160.237/api/v1/Categories?parent_id=0&lang=1').then(function (data){
		// 	alert(data.response[0])
		// 		this.setState({ categories: data.response })
		//
		// })
  	}

	_keyExtractor = (item) => item.id;

	renderCategory = (item) => {
		//return <CategoryBox item={item} navigation={this.props.navigation} />

		const { navigation } = this.props;

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

	render () {
		const { navigation } = this.props

		return (
			<Container style={{ backgroundColor: bgColor }}>
				<MainHeader navigation={navigation} />
				<FlatList
					contentContainerStyle={{ paddingVertical: 12 }}
					numColumns={2}
					data={this.state.categories}
					keyExtractor={this._keyExtractor}
					style={{ flex: 1 }}
					ItemSeparatorComponent={
						() => <View style={{ height: 12, backgroundColor: 'transparent' }}></View>
					}
					renderItem={({ item }) => this.renderCategory(item)}
				/>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
	currLang: state.language.currLang || {},
})

export default connect(mapStateToProps)(Home)
