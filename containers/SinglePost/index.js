import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Image ,ScrollView,Modal,TouchableHighlight} from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Server from '../../constants/Server'
import PlaceBox from '../../components/CategoriesPlaces/CategoryBox.js'
import { GET } from '../../utils/Network';
import FontedText from '../../components/FontedText';
import { Container,Button,Icon, Header, Content,Footer, FooterTab,Left, Right, List, ListItem, Thumbnail, Text, Body } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

class ForumCategories extends Component {
  constructor(props) {
    super(props);

	this.state = {
		post: [
      {
        image:'no image'
      }
    ],
    type:1,
    modalVisible: false,

  }
}
  componentDidMount(){
    GET('forum_single_post/single_post?post_id=1',
			res => {
				// on success
        this.setState({post:res.data.response,comments:res.data.comments})

			},
			err => {
        alert('error loading data please restart the app')
			},
			false // should authorise this request?
		)

  }
  setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

  renderCategory = (item, index) => {
		return (
			<TouchableOpacity
			onPress={()=> {this.props.navigation.navigate('ForumPosts',{category_id:item.id})}}
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
    const post = this.state.post[0];
    var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];

		return (

			<LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
				<MainHeader navigation={navigation} />
        <ScrollView>
        <Image
          source={{ uri: post.image }}
          style={{ flex:1,width:'100%', height: 200,
             }}
            resizeMode="cover"
        />
        <FontedText style={{padding:15,textAlign:'center'}} text={post.post}/>
        </ScrollView>

        <Footer>
          <FooterTab>
            <Button onPress={() => {
            this.setModalVisible(true);
          }} style={{flex:1}}>
              <FontAwesome name="comment-o" size={20}/>
            </Button>
          </FooterTab>
        </Footer>





        {
          //here it is comments modal
        }
        <Modal
         animationType="slide"
         transparent={false}
         visible={this.state.modalVisible}
         >
         <Container>
         <Header>

         <View style={{flexDirection:'row',flex:.9,justifyContent:'center',alignItems:'center'}}>
         <FontAwesome style={{paddingRight:3,textAlign:'center',alignItems:'center'}} name="comment-o" size={20}/>
         <FontedText style={{textAlign:'center'}}  text="التعليقات"/>
         </View>
         <TouchableHighlight
           onPress={() => {
             this.setModalVisible(!this.state.modalVisible);
           }}
           style={{flex:.1,justifyContent:'center',alignItems:'center'}}>
         <Ionicons style={{}} name="ios-arrow-back" size={20}/>
         </TouchableHighlight>
        </Header>
        <Content>
        <List dataArray={this.state.comments}
            renderRow={(item) =>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{ uri: item.user.profile_img_url}} />
                </Left>
                <Body>
                  <FontedText style={{textAlign:'right'}} text={item.user.name}/>

                  <Text style={{textAlign:'right'}} note>{item.comment}</Text>
                </Body>
                <Right>
                  <Text note>{item.time}</Text>
                </Right>
              </ListItem>
            }>
          </List>

        </Content>
      </Container>

       </Modal>
      </LazyContainer>

		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(ForumCategories)
