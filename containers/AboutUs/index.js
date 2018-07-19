import React, { Component } from 'react'
import { FlatList, TouchableOpacity ,Linking} from 'react-native';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor, secondColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'
import Server from '../../constants/Server'
import PlaceBox from '../../components/CategoriesPlaces/CategoryBox.js'
import { GET } from '../../utils/Network';
import FontedText from '../../components/FontedText';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';

class AboutUs extends Component {
  constructor(props) {
    super(props);

	this.state = {
		categories: [
    ],
    type:1,
    active: 'true',
    facebook:'#',
    instagram:'#',
    mail:'http://google.com',
    phone:'#',
    text:'....'
  }
}
  componentDidMount(){
    GET('Categories?parent_id=',
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

		return (
			<LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
				<MainHeader navigation={navigation} />
			     <FontedText text={this.state.text} />
           <Fab
                  active={this.state.active}
                  direction="up"
                  containerStyle={{ }}
                  style={{ backgroundColor: '#5067FF' }}
                  position="bottomRight"
                  onPress={() => this.setState({ active: !this.state.active })}>
                  <Icon name="call" />
                  <Button onPress={()=>{Linking.openURL(this.state.phone);}} style={{ backgroundColor: '#34A34F' }}>
                    <Icon name="logo-whatsapp" />
                  </Button>
                  <Button onPress={()=>{Linking.openURL(this.state.facebook);}} style={{ backgroundColor: '#3B5998' }}>
                    <Icon name="logo-facebook" />
                  </Button>
                  <Button onPress={()=>{Linking.openURL(this.state.instagram);}} style={{ backgroundColor: '#c6309b' }}>
                    <Icon name="logo-instagram" />
                  </Button>
                  
                  <Button onPress={()=>{Linking.openURL(this.state.mail);}}  style={{ backgroundColor: '#DD5144' }}>
                    <Icon name="mail" />
                  </Button>
                </Fab>
			</LazyContainer>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(AboutUs)
