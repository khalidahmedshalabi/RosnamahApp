import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity,Modal,TouchableHighlight,ScrollView, Image, Text,Dimensions, Platform } from 'react-native'
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
import {Container,Icon,Content, Accordion,Footer, FooterTab,List, ListItem,Item, Thumbnail,Button} from 'native-base'
import { GET } from '../../utils/Network';
import Communications from 'react-native-communications';
import { store } from '../../App';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontedInput from '../../components/FontedInput';

class SinglePlace extends Component {
  constructor(props) {
    super(props);

	this.state = {
    isReady:false,
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
      description:'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.ومن هنا وجب على المصممأيضعنصوصا مؤقتة على التصميً.',
      times:'..'
    },
    starCount:3,
    modalVisible: false,
    comments:[],
    comment:''

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


    GET('place/single_place?place_id='+this.props.navigation.state.params.place_id+'&lang='+code,
			res => {
				// on success
        this.setState({post:res.data.place[0],starCount:res.data.rating,images:res.data.place[0].images})
			},
			err => {
				// on failure
			},
			false // should authorise this request?
		)

  }
  setModalVisible(visible) {
  this.setState({modalVisible: visible});
}
comment = ()=>{
  comments = this.state.comments;
  comments.push({
    comment:this.state.comment,
    time:'3pm',
    user:{
      name:'مستخدم تجريبي',
      profile_img_url:'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg'
    }
  });
  this.setState({comments,comment:''});
}
  _renderItem = ({item, index}) => {
       return (
           <View>
           {(item.type == 1) ?
             <Image
                  source={{ uri: item.image }}
                  containerStyle={{height:200}}
                  style={{height:200,borderRadius:4}}
                  parallaxFactor={0.4}

                    />
                    :
            null
              }
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
visit(){
  GET('place/make_visit?place_id='+this.props.navigation.state.params.place_id+'&user_id='+store.getState().user.auth_token,
    res => {
      // on success

      alert('تم تسجيل زياره')
    },
    () => {
    },
    true // should authorise this request?
  )
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
      <View >
      <FontedText style={{padding:15}} text={this.state.post.description}/>
      </View>

      {
        //buttons box ---------->
      }
      <View style={{flexDirection:'row',backgroundColor:'#f7f7f7',padding:15,marginTop:15}}>
        <View style={{flex:.2,justifyContent:'center',alignItems:'center'}}>
        <Ionicons name="ios-share-outline" size={30} color={secondColor}  />
        </View>


        <TouchableOpacity onPress={()=>{
          this.visit();
        }} style={{flex:.2,alignItems:'center'}}>
        <Ionicons  name="ios-checkmark-circle-outline" size={30} color={secondColor}  />
        </TouchableOpacity>


        <View style={{flex:.2,alignItems:'center'}}>
        <Ionicons name="ios-camera-outline" size={30} color={secondColor}  />
        </View>


        <TouchableOpacity activeOpacity={.9} onPress={()=>{
          Communications.phonecall(this.state.post.phone);
        }} style={{flex:.2,alignItems:'center'}}>
        <Ionicons  name="ios-call-outline" size={30} color={secondColor}  />
        </TouchableOpacity>


        <View style={{flex:.2,alignItems:'center'}}>
        <Ionicons name="ios-browsers-outline" size={30} color={secondColor}  />
        </View>
      </View>
      {
        // times content ------>
      }
          <Accordion
          dataArray={dataArray}
          renderHeader={this._renderHeader}
renderContent={this._renderContent}

         />
         <Footer>
           <FooterTab>
             <Button onPress={() => {
             this.setModalVisible(true);
           }} style={{flex:1}}>
               <FontAwesome name="comment-o" size={20}/>
             </Button>
           </FooterTab>
         </Footer>
         <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <Container>
          {
            //head starts here
          }
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

         {
           //the end of head
         }

         <Content>
         {
           //comments listing
         }
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
           <Item>
             <FontedInput
             onChangeText={(comment) => this.setState({comment})}
         value={this.state.comment}
         style={{padding:15}}
         onSubmitEditing={()=> {this.comment()}} placeholder={translate('comment')} />
           </Item>
       </Container>

        </Modal>

      </LazyContainer>
      </Container>


		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
  currLang: state.language.currLang || {},
})

export default connect(mapStateToProps)(SinglePlace)
