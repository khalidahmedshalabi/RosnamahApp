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
import { GET } from '../../utils/Network';
import  {ListView,ImageBackground,Divider,Title,Subtitle,Tile} from '@shoutem/ui'
import FontedText from '../../components/FontedText';

class ForumCategories extends Component {
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
		const {
			key, // id
			label, // full name
			code, // iso2 code
			isRTL, // if RTL
			isDefault // if default
		 } = currLang
     GET('forum_categories?lang='+key,
 			res => {
 				// on success
 				this.setState({ categories: res.data.categories })
 			},
 			() => {
 			},
 			false // should authorise this request?
 		)


  }
  renderCategory = (item, index) => {
		return (
			<TouchableOpacity
			onPress={()=> {this.props.navigation.navigate('ForumPosts',{category_id:item.id})}}
				style={{ flex: 1,  backgroundColor: 'white' }}>

        <ImageBackground
            styleName="large-ultra-wide"
            source={{uri: item.image}}
        >
            <Tile>
            <FontedText style={{ color: 'white', fontSize: 25 }} text={item.name} />
            </Tile>
        </ImageBackground>
        <Divider styleName="line"/>

			</TouchableOpacity>
		)
	}

	render () {
		const { translate, navigation } = this.props

		return (
			<LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
				<MainHeader navigation={navigation} />
				<FlatList
					contentContainerStyle={{ paddingVertical: 3 }}
					numColumns={1}
					data={this.state.categories}
					style={{ flex: 1 }}
					ItemSeparatorComponent={
						() => <View style={{ height:3, backgroundColor:'white'  }}></View>
					}
					renderItem={({ item, index }) => this.renderCategory(item, index)  }
              />
			</LazyContainer>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
  currLang: state.language.currLang || {},
})

export default connect(mapStateToProps)(ForumCategories)
