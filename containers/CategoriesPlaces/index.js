import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Server from '../../constants/Server'

class CategoriesPlaces extends Component {
  constructor(props) {
    super(props);

	this.state = {
		categories: [
    ]
  }
}
  componentDidMount(){
    fetch(Server.base_url+'/api/v1/Categories?parent_id='+this.props.navigation.state.params.category_id).then(res => res.json())
    .then(data =>{
      this.setState({categories:data.response})
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
					renderItem={({ item, index }) => (
            <TouchableOpacity activeOpacity={.8}  onPress={()=>this.props.navigation.navigate( {routeName: 'CategoriesPlaces',
                params: {
                    key:item.key
                },
                key: item.key})}>
            <CategoryBox
            title = {item.name}
            image = {item.img}
            />
            </TouchableOpacity>
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
