import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Image, Text,Dimensions, Platform } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Server from '../../constants/Server'
import PlaceBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Carousel from 'react-native-snap-carousel';
import Pagination from 'react-native-snap-carousel';
import { Body, Left, Right, Header } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontedText from '../../components/FontedText';
import { NavigationActions } from 'react-navigation'
import { Rating, AirbnbRating } from 'react-native-ratings';

class SinglePlace extends Component {
  constructor(props) {
    super(props);

	this.state = {
		images: [
      {
        title:'https://www.gettyimages.ca/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg'
      },
      {
        title:'https://media.istockphoto.com/photos/plant-growing-picture-id510222832?k=6&m=510222832&s=612x612&w=0&h=Pzjkj2hf9IZiLAiXcgVE1FbCNFVmKzhdcT98dcHSdSk='
      },
      {
        title:'https://lh3.googleusercontent.com/i9ihFYsnaLujPL9sMcI25sW88eQLjYY12Czq9QJnG4KE1Poj6RLoXIB_ePzTyN50wZsAko9XQg=w640-h400-e365'
      },
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
  _renderItem ({item, index}) {
       return (
           <Image
             resizeMode='cover'
             style={{ flex: 1  }}
             source={{ uri: item.title}}
             style={{height:200}}
             />


       );
   }

   ratingCompleted(rating) {
  console.log("Rating is: " + rating)
  }

	render () {
		const { translate, navigation } = this.props
    const IS_IOS = Platform.OS === 'ios';
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

    function wp (percentage) {
        const value = (percentage * viewportWidth) / 100;
        return Math.round(value);
    }
		return (
			<LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
      <Header
        noShadow={true}
        androidStatusBarColor='#f2f2f2'
        iosBarStyle='dark-content'
        style={{
          backgroundColor: secondColor,
          justifyContent:'flex-end',
          textAlign:'center',
          flexDirection:'row'
        }}>
        <FontedText style={{textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        flex:.8,
        color:bgColor
        }} text='الدوحه'/>

        <Ionicons name="ios-arrow-round-back" size={30} color={bgColor} onPress={
          ()=>{
            this.props.navigation.dispatch(NavigationActions.back());
          }
        } style={{flex:.1,padding:10}} />
        </Header>
        <Rating
        onFinishRating={this.ratingCompleted}
        style={{justifyContent:'center'}}
        />
      <Carousel
        data={this.state.images}
        renderItem={this._renderItem}
        sliderWidth={wp(100)}
        itemWidth={wp(90)}
        sliderHeight={0}
        contentContainerCustomStyle	={{justifyContent:'center',paddingHorizontal:20}}
        containerCustomStyle={{paddingVertical: 10}}
        itemHeight={0}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={.7}
        enableMomentum={true}
        activeSlideAlignment={'start'}
        activeAnimationType={'spring'}
        activeAnimationOptions={{
            friction: 1,
            tension: 1
        }}
      />
      <Text>aaaa</Text>

			</LazyContainer>

		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(SinglePlace)
