import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Server from '../../constants/Server'
import PlaceBox from '../../components/CategoriesPlaces/CategoryBox.js'

class SinglePlace extends Component {
  constructor(props) {
    super(props);

	this.state = {
		categories: [
    ],
    type:1
  }
}
  componentDidMount(){
    fetch(Server.base_url+'/api/v1/Categories?parent_id='+this.props.navigation.state.params.category_id).then(res => res.json())
    .then(data =>{
      this.setState({categories:data.response,type:data.type})
    })
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
					renderItem={({ item, index }) =>
                (this.state.type == 1) ? (
                  <TouchableOpacity activeOpacity={.8}  onPress={()=>this.props.navigation.navigate( {routeName: 'CategoriesPlaces',
                      params: {
                          category_id:item.id
                      },
                      key: Math.random() })}>

                  <CategoryBox
                  title = {item.name}
                  image = {item.image}
                  desc={item.descc}

                  />
                  </TouchableOpacity>

                ) : (
                  <TouchableOpacity activeOpacity={.8}  onPress={()=>this.props.navigation.navigate( {routeName: 'CategoriesPlaces',
                      params: {
                          category_id:item.id
                      },
                      key: Math.random() })}>

                  <PlaceBox
                  title = {item.name}
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
})

export default connect(mapStateToProps)(SinglePlace)
