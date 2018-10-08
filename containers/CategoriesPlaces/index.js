import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Server from '../../constants/Server'
import PlaceBox from '../../components/CategoriesPlaces/CategoryBox.js'
import { GET } from '../../utils/Network';

class CategoriesPlaces extends Component {
  constructor(props) {
    super(props);

	this.state = {
		categories: [
    ],
    type:1
  }
}
  componentDidMount(){
    const { currLang } = this.props
    alert('aa'+this.props.navigation.state.params.category_id)
		const {
			key, // id
			label, // full name
			code, // iso2 code
			isRTL, // if RTL
			isDefault // if default
		 } = currLang
    GET('Categories?parent_id='+this.props.navigation.state.params.category_id+'&lang='+code,
			res => {
				// on success
        this.setState({categories:res.data.response,type:res.data.type})
			},
			err => {
        alert('error loading data please restart the app')
			},
			false // should authorise this request?
		)

  }

	render () {
		const { translate, navigation } = this.props
    const utf8 = require('utf8');

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
					renderItem={({ item, index }) =>
                (this.state.type == 1) ? (
                  <TouchableOpacity activeOpacity={.8}  onPress={()=>this.props.navigation.navigate( {routeName: 'CategoriesPlaces',
                      params: {
                          category_id:item.id
                      },
                      key: Math.random() })}>

                  <CategoryBox
                  title = {utf8.decode(item.name)}
                  image = {item.image}
                  desc={item.descc}

                  />
                  </TouchableOpacity>

                ) : (
                  <TouchableOpacity activeOpacity={.8}  onPress={()=>this.props.navigation.navigate( {routeName: 'SinglePlace',
                      params: {
                          place_id:item.id,
                          place_name:utf8.decode(item.name)
                      },
                      key: Math.random() })}>

                  <PlaceBox
                  title = {utf8.decode(item.name)}
                  image = {item.image}
                  desc={item.description}
                  />

                  </TouchableOpacity>
                )

              }
              />
			</LazyContainer>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
  currLang: state.language.currLang || {},
})

export default connect(mapStateToProps)(CategoriesPlaces)
