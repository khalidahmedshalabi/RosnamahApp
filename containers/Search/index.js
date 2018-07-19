import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, TextInput, Image, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import { Container, Header, Left, Right, Body } from 'native-base';
import { bgColor } from '../../constants/Colors';
import { GET } from '../../utils/Network';
//import CategoryBox from '../../components/CategoriesPlaces/CategoryBox';
import FontedText from '../../components/FontedText';
import BackIcon from '../../components/BackIcon';
import Ionicons from 'react-native-vector-icons/Ionicons'

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchingFor: '',
			categories: [

			]
		}

	}
	  
	doSearch = () => {
		const { currLang } = this.props
		const { code } = currLang
		const { searchingFor } = this.state

		GET(`Categories?parent_id=0&lang=${code}&keyword=${searchingFor}`,
			res => {
				// on success
				this.setState({ categories: res.data.response })
			},
			() => {
			},
			false // should authorise this request?
		)
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
		const { translate } = this.props

		return (
			<Container style={{ backgroundColor: bgColor }}>
				<Header
					noShadow={true}
					androidStatusBarColor='#f2f2f2'
					iosBarStyle='dark-content'
					style={{
						backgroundColor: 'white',
					}}>
					<Left style={{ flex: 0.16 }}>
						<TouchableOpacity
							style={{ padding: 10 }}
							onPress={() => this.props.navigation.goBack()}>
							<BackIcon />
						</TouchableOpacity>
					</Left>

					<Body style={{ flex: 0.8 }}>
						<View
							style={{
								width: '100%',
								flexDirection: 'row',
								alignItems: 'center',
								marginLeft: 8,
								backgroundColor: '#f2f2f2',
								borderRadius: 10,
								paddingHorizontal: 10,
								marginVertical: 8
							}}>
							<Ionicons color='#999999' name='ios-search' size={26} style={{ marginRight: 10 }} />
							<TextInput
								underlineColorAndroid='transparent'
								returnKeyType='search'
								placeholder={translate('SearchBarText')}
								placeholderTextColor='#a8a8a8'
								autoFocus={true}
								onChangeText={(text) => this.setState({ searchingFor: text }, () => this.doSearch())}
								style={{ width: '100%', fontSize: 17, fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_light' }} />
						</View>
					</Body>

					<Right style={{ flex: 0.07 }} />
				</Header>
				
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

export default connect(mapStateToProps)(Search)
