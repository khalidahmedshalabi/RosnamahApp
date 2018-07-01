import React, { Component } from 'react'
import { I18nManager, View, TouchableOpacity, Image, Dimensions, Text, StyleSheet, PixelRatio, NativeModules } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import colors, { bgColor, mainColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import MapView from 'react-native-maps'
import { Input, Container, Content, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'

var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class Addplace extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialRegion: {				
				latitude: 37.78825,
				longitude: -122.4324,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			},
			region: {
				latitude: 37.78825,
				longitude: -122.4324,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			},
			error:null,
			img_1: null,
			img_2: null,
			img_3: null,
			img_4: null,
			img_5: null,
			img_6: null,
		}
	}
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
		   (position) => {
			 this.setState({
				region: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				},
			   error: null,
			 });
		   },
		   (error) => this.setState({ error: error.message }),
		   { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
		);
		this.watchId = navigator.geolocation.watchPosition(
			(position) => {
				this.setState({
					region: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					},
				   error: null,
				 });
			},
			(error) => this.setState({ error: error.message }),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
		  );
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId);
	  }

	  pickImage = key => {
			ImagePicker.showImagePicker(options, (response) => {
					let source = { uri: response.uri };
					switch(key) {
						case 1:
							this.setState({
								img_1: source
							});
						break;
						case 2:
							this.setState({
								img_2: source
							});
						break;
						case 3:
							this.setState({
								img_3: source
							});
						break;
						case 4:
							this.setState({
								img_4: source
							});
						break;
						case 5:
							this.setState({
								img_5: source
							});
						break;
						case 6:
							this.setState({
								img_6: source
							});
						break;
					}
					
			});	
	  }
	
	render() {
		const { navigation } = this.props

		return (
			<LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
				<Container>
					<Content>
						<MainHeader navigation={navigation} />
					
						<View style={{ width, height: height/2, }} >
						<Image style={{ width: 50, height: 50, position: 'absolute', zIndex: 1, top: (height/4-40), right: (width/2-25) }} resizeMode='contain' source={require('../../assets/images/marker.png')} />
						<MapView
							style={{ flex: 1 }}
							region={this.state.region}
							cacheEnabled={true}
							showsUserLocation={true}
							userLocationAnnotationTitle="asfasfasfasfasfasf"
							ref={ref => { this.mapView = ref } }
							provider='google'
							initialRegion={this.state.initialRegion}
						>
						<MapView.Circle
							key = { 'asfklahsflkahsflkahsflkh' }
							center = {this.state.region}
							radius = { 1000 }
							strokeWidth = { 1 }
							strokeColor = { '#1a66ff' }
							fillColor = { 'rgba(230,238,255,0.5)' }
						/>
						</MapView>
						</View>
						<View style={{ flex: 1, }} >
							<View style={{ backgroundColor: colors.secondColor }} >
								<Input style={{ textAlign: 'center', margin: 15, backgroundColor: '#fff' }} placeholder="اسم المكان" />
							</View>
								
							<View style={{ flexDirection: 'row' }} >
							<TouchableOpacity style={{ flex: 1 }} onPress={() => this.pickImage(1)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										this.state.img_1 ? 
										<Image source={this.state.img_1} style={styles.avatar} resizeMode='contain' /> : <Ionicons name='ios-add-outline' size={25} color='grey' />
									}
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ flex: 1 }} onPress={() => this.pickImage(2)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										this.state.img_2 ? 
										<Image source={this.state.img_2} style={styles.avatar} resizeMode='contain' /> : <Ionicons name='ios-add-outline' size={25} color='grey' />
									}
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ flex: 1 }} onPress={() => this.pickImage(3)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										this.state.img_3 ? 
										<Image source={this.state.img_3} style={styles.avatar} resizeMode='contain' /> : <Ionicons name='ios-add-outline' size={25} color='grey' />
									}
									</View>
								</TouchableOpacity>
							</View>
							<View style={{ flexDirection: 'row' }} >
							<TouchableOpacity style={{ flex: 1 }} onPress={() => this.pickImage(4)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										this.state.img_4 ? 
										<Image source={this.state.img_4} style={styles.avatar} resizeMode='contain' /> : <Ionicons name='ios-add-outline' size={25} color='grey' />
									}
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ flex: 1 }} onPress={() => this.pickImage(5)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										this.state.img_5 ? 
										<Image source={this.state.img_5} style={styles.avatar} resizeMode='contain' /> : <Ionicons name='ios-add-outline' size={25} color='grey' />
									}
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ flex: 1 }} onPress={() => this.pickImage(6)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										this.state.img_6 ? 
										<Image source={this.state.img_6} style={styles.avatar} resizeMode='contain' /> : <Ionicons name='ios-add-outline' size={25} color='grey' />
									}
									</View>
								</TouchableOpacity>
							</View>

							<Button
							full
							onPress={() => {}}
							style={{ 
								backgroundColor: mainColor, 
								//elevation: 0, 
								borderRadius: 6, 
								paddingVertical: 24, 
								paddingHorizontal: 10,
								marginBottom: 15
							}}
							> 
							<Text style={{ color: '#fff', fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_light', }} >تأكيد</Text>
						</Button>

						</View>
					</Content>
				</Container>
			</LazyContainer>
		)
	}
}
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#F5FCFF'
	},
	avatarContainer: {
	  borderColor: '#9B9B9B',
	  borderWidth: 1 / PixelRatio.get(),
	  justifyContent: 'center',
		alignItems: 'center',
		margin: 20
	},
	avatar: {
	  borderRadius: 50,
	  width: 100,
	  height: 100
	}
  });

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(Addplace)
