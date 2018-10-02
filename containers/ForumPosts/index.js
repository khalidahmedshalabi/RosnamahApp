import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Server from '../../constants/Server'
import PostBox from '../../components/PostBox'
import { GET } from '../../utils/Network';
import { Container, Header, Content, Card, CardItem, Thumbnail,Text, Button, Icon, Left, Body, Right } from 'native-base';
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
    GET('forum_posts?category_id='+this.props.navigation.state.params.category_id,
			res => {
				// on success
        console.log(res)
        this.setState({categories:res.data.response})
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
          ListHeaderComponent={()=>(
            <TouchableOpacity style={{backgroundColor:secondColor,flex:1,margin:10}}  onPress={()=>this.props.navigation.navigate('AddPost',{category_id:this.props.navigation.state.params.category_id})}>
            <FontedText
              style={{
                padding: 10,
                fontStyle: "italic",
                borderRadius:4,
                textAlign:'center',
                color:'white'
              }}
              text={translate('AddPost')}
            />
                        </TouchableOpacity>
          )}
					renderItem={({ item, index }) => (
            <TouchableOpacity activeOpacity={.8}  onPress={()=>this.props.navigation.navigate( {routeName: 'SinglePost',
                params: {
                    post_id:item.id
                },
                })}>

          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: item.image}} />
                <Body>
                  <Text>{item.title}</Text>
                  <Text note>{item.title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: item.image}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>{item.comments} Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>{item.posted_time}</Text>
              </Right>
            </CardItem>
          </Card>


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
