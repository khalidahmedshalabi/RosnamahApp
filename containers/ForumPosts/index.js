import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Server from '../../constants/Server'
import PostBox from '../../components/PostBox'
import { GET } from '../../utils/Network';

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
    GET('forum_posts?category_id='+this.props.navigation.state.params.category_id,
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
					<Text style={{ color: '#515254', fontSize: 17 }}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		)
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
            <TouchableOpacity activeOpacity={.8}  onPress={()=>this.props.navigation.navigate( {routeName: 'SinglePost',
                params: {
                    post_id:item.id
                },
                })}>

            <PostBox
            name = {item.title}
            image = {item.image}
            desc={item.title}
            time={item.posted_time}
            comments={item.comments}
            />

            </TouchableOpacity>
          )  }
              />
			</LazyContainer>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(ForumCategories)
