import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity,ScrollView, Image, Text,Dimensions, Platform } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Server from '../../constants/Server'
import PlaceBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Carousel,{ ParallaxImage } from 'react-native-snap-carousel';
import Pagination from 'react-native-snap-carousel';
import { Body, Left, Right, Header } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontedText from '../../components/FontedText';
import { NavigationActions } from 'react-navigation'
import StarRating from 'react-native-star-rating';
import {Container,Icon,Content, Accordion} from 'native-base'
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
    type:1,
    activeSlide:1,
    post:{
      text:'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.ومن هنا وجب على المصممأيضعنصوصا مؤقتة على التصميً.',
      times:'saturday : 9 am to 5 pm'+
      '- sunday : 9 am to 9 pm - monday: 9 am to 6pm - tusday : 6 am to 4 pm - wednsday: 7 am to 7 pm - thursday : 8 am to 8 pm - friday :holiday'
    },
    starCount:3
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
           <View>
             <Image
                  source={{ uri: item.title }}
                  containerStyle={{height:200}}
                  style={{height:200,borderRadius:4}}
                  parallaxFactor={0.4}

                    />

            </View>

       );
   }

   onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }


//acording data ---->
_renderHeader(title, expanded) {
return (
  <View
    style={{
      flexDirection: "row",
      padding: 10,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: secondColor,
      borderRadius:4
    }}
  >
    <FontedText style={{color:'white',fontSize:18}} text={title}/>


    {expanded
      ? <Icon style={{ fontSize: 18 ,color:'white',}} name="remove-circle" />
      : <Icon style={{ fontSize: 18 ,color:'white',}} name="add-circle" />}
  </View>
);
}
_renderContent(content) {
return (
  <FontedText
    style={{
      backgroundColor: "#f7f7f7",
      padding: 10,
      fontStyle: "italic",
      borderRadius:4
    }}
    text={content}
  />

);
}
	render () {
		const { translate, navigation } = this.props
    const IS_IOS = Platform.OS === 'ios';
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
    const dataArray = [
      { title: translate('opening_times'), content: ""+this.state.post.times },
    ];
    function wp (percentage) {
        const value = (percentage * viewportWidth) / 100;
        return Math.round(value);
    }

		return (
      <Container>
			<LazyContainer style={{ flex: 1, backgroundColor: '#fff' }}>
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
      }} text={this.props.navigation.state.params.place_name}/>

        <Ionicons name="ios-arrow-round-back" size={30} color={bgColor} onPress={
          ()=>{
            this.props.navigation.dispatch(NavigationActions.back());
          }
        } style={{flex:.1,padding:10}} />
        </Header>
        <ScrollView>
      <Carousel
        data={this.state.images}
        renderItem={this._renderItem}
        sliderWidth={wp(100)}
        itemWidth={wp(90)}
        sliderHeight={0}
        contentContainerCustomStyle	={{justifyContent:'center',paddingHorizontal:20,height:10}}
        containerCustomStyle={{paddingVertical: 20,height:220}}
        itemHeight={0}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={.7}
        activeSlideAlignment={'start'}
        loop={true}

        activeAnimationType={'spring'}
        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
        activeAnimationOptions={{
            friction: 1,
            tension: 1
        }}
      />
      {
        //rating box -------->
      }
      <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
        <View style={{flexDirection:'row',borderRadius:4,backgroundColor:'#f7f7f7',padding:15,width:'90%',justifyContent:'center',alignItems:'center'}}>
          <StarRating
          disabled={false}
          maxStars={5}
          fullStarColor={'gold'}
          emptyStarColor={'gold'}
          rating={this.state.starCount}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
        </View>
      </View>
      {
        //post text -------->
      }
      <View style={{

}}>
      <FontedText style={{padding:15}} text={this.state.post.text}/>
      </View>

      {
        //buttons box ---------->
      }
      <View style={{flexDirection:'row',backgroundColor:'#f7f7f7',padding:15,marginTop:15}}>
        <View style={{flex:.2,justifyContent:'center',alignItems:'center'}}>
        <Ionicons name="ios-share-outline" size={30} color={secondColor}  />
        </View>


        <View style={{flex:.2,alignItems:'center'}}>
        <Ionicons name="ios-checkmark-circle-outline" size={30} color={secondColor}  />
        </View>


        <View style={{flex:.2,alignItems:'center'}}>
        <Ionicons name="ios-camera-outline" size={30} color={secondColor}  />
        </View>


        <View style={{flex:.2,alignItems:'center'}}>
        <Ionicons name="ios-call-outline" size={30} color={secondColor}  />
        </View>


        <View style={{flex:.2,alignItems:'center'}}>
        <Ionicons name="ios-browsers-outline" size={30} color={secondColor}  />
        </View>
      </View>
      {
        // times content ------>
      }
      <Container>
        <Content padder>
          <Accordion
          dataArray={dataArray}
          renderHeader={this._renderHeader}
renderContent={this._renderContent}

         />
       </Content>
     </Container>


      </ScrollView>
      </LazyContainer>
      </Container>


		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(SinglePlace)
