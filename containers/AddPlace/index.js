import React, { Component } from 'react'
import { I18nManager, View, TouchableOpacity, Image, Dimensions, Text, StyleSheet, PixelRatio, ActivityIndicator, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import colors, { bgColor, mainColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import MapView from 'react-native-maps'
import { Input, Container, Content, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { uploadImage } from '../../utils'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import ImagePicker from 'react-native-image-picker'


class Addplace extends Component {
	constructor(props) {
		super(props);

		this.state = {
			placeName: '',
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
			fullScreenLoader :false
		}
	}

	uploadAllImgs = () => {
		this.setState({ fullScreenLoader: true })
		let { img_1, img_2, img_3, img_4, img_5, img_6, placeName } = this.state
		if(img_1 && placeName != '')
			uploadImage(img_1.uri, placeName)
			.then(url => this.setState({ img_1: {uri : url}, fullScreenLoader: false }))
			.catch(error => alert(error))
		if(img_2 && placeName != '')
			uploadImage(img_2.uri, placeName)
			.then(url => this.setState({ img_2: {uri : url}, fullScreenLoader: false }))
			.catch(error => alert(error))
		if(img_3 && placeName != '')
			uploadImage(img_3.uri, placeName)
			.then(url => this.setState({ img_3: {uri : url}, fullScreenLoader: false }))
			.catch(error => alert(error))
		if(img_4 && placeName != '')
			uploadImage(img_4.uri, placeName)
			.then(url => this.setState({ img_4: {uri : url}, fullScreenLoader: false }))
			.catch(error => alert(error))
		if(img_5 && placeName != '')
			uploadImage(img_5.uri, placeName)
			.then(url => this.setState({ img_5: {uri : url}, fullScreenLoader: false }))
			.catch(error => alert(error))
		if(img_6 && placeName != '')
			uploadImage(img_6.uri, placeName)
			.then(url => this.setState({ img_6: {uri : url}, fullScreenLoader: false }))
			.catch(error => alert(error))
	}
	_pickImage(key) {
		let { img_1, img_2, img_3, img_4, img_5, img_6 } = this.state
		if(key == 1)
			this.setState({ img_1: '' })
		if(key == 2)
			this.setState({ img_2: '' })
		if(key == 3)
			this.setState({ img_3: '' })
		if(key == 4)
			this.setState({ img_4: '' })
		if(key == 5)
			this.setState({ img_5: '' })
		if(key == 6)
			this.setState({ img_6: '' })

    ImagePicker.launchImageLibrary({}, response  => {
			let source = { uri: response.uri };
			switch(key) {
					case 1:
						this.setState({
							img_1: response
						});
					break;
					case 2:
						this.setState({
							img_2: response
						});
					break;
					case 3:
						this.setState({
							img_3: response
						});
					break;
					case 4:
						this.setState({
							img_4: response
						});
					break;
					case 5:
						this.setState({
							img_5: response
						});
					break;
					case 6:
						this.setState({
							img_6: response
						});
					break;
				}
    })
	}
	
	componentWillMount() {
		// navigator.geolocation.getCurrentPosition(
		//    (position) => {
		// 	 this.setState({
		// 		region: {
		// 			latitude: position.coords.latitude,
		// 			longitude: position.coords.longitude,
		// 			latitudeDelta: 0.0922,
		// 			longitudeDelta: 0.0421,
		// 		},
		// 	   error: null,
		// 	 });
		//    },
		//    (error) => this.setState({ error: error.message }),
		//    { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
		// );
		// this.watchId = navigator.geolocation.watchPosition(
		// 	(position) => {
		// 		this.setState({
		// 			region: {
		// 				latitude: position.coords.latitude,
		// 				longitude: position.coords.longitude,
		// 				latitudeDelta: 0.0922,
		// 				longitudeDelta: 0.0421,
		// 			},
		// 		   error: null,
		// 		 });
		// 	},
		// 	(error) => this.setState({ error: error.message }),
		// 	{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
		//   );
	}

	componentWillUnmount() {
		// navigator.geolocation.clearWatch(this.watchId);
		}

	  // pickImage = key => {
			
		// 	ImagePicker.launchImageLibrary({}, response  => {
		// 		uploadImage(response.uri)
		// 			.then(url => this.setState({ img_1: url }))
		// 			.catch(error => console.log(error))
		// 	})
			
			// ImagePicker.showImagePicker(options, (response) => {
					// let source = { uri: response.uri };
					// switch(key) {
					// 	case 1:
					// 		this.setState({
					// 			img_1: source
					// 		});
					// 	break;
					// 	case 2:
					// 		this.setState({
					// 			img_2: source
					// 		});
					// 	break;
					// 	case 3:
					// 		this.setState({
					// 			img_3: source
					// 		});
					// 	break;
					// 	case 4:
					// 		this.setState({
					// 			img_4: source
					// 		});
					// 	break;
					// 	case 5:
					// 		this.setState({
					// 			img_5: source
					// 		});
					// 	break;
					// 	case 6:
					// 		this.setState({
					// 			img_6: source
					// 		});
					// 	break;
					// }
					
			// });	
		// }
		
		Loading = () => {
			if(this.state.fullScreenLoader)
				 return (
					 <View style={{ position: 'absolute', zIndex: 20, width, height, justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, .5)' }}>
						 <ActivityIndicator size="large" color={mainColor} />
						</View>
				 )
			else
				 return null;
		}
	
	render() {
		const { navigation } = this.props

		return (
			<LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
				<Container>
				{this.Loading()}
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
								<TextInput underlineColorAndroid='transparent' onChangeText={(placeName) => this.setState({placeName})} style={{ textAlign: 'center', margin: 15, backgroundColor: '#fff' }} placeholder="اسم المكان" />
							</View>
								
							<View style={{ flexDirection: 'row' }} >
							<TouchableOpacity style={{ flex: 1 }} onPress={() => this._pickImage(1)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										(() => {
											switch (this.state.img_1) {
												case null:
													return <Ionicons name='ios-add-outline' size={25} color='grey' />
												case '':
													return <ActivityIndicator />
												default:
													return (
														<Image source={{ uri: this.state.img_1.uri }} style={styles.avatar} resizeMode='contain' />
													)
											}
										})()
									}
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ flex: 1 }} onPress={() => this._pickImage(2)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										(() => {
											switch (this.state.img_2) {
												case null:
													return <Ionicons name='ios-add-outline' size={25} color='grey' />
												case '':
													return <ActivityIndicator />
												default:
													return (
														<Image source={{ uri: this.state.img_2.uri }} style={styles.avatar} resizeMode='contain' />
													)
											}
										})()
									}
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ flex: 1 }} onPress={() => this._pickImage(3)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										(() => {
											switch (this.state.img_3) {
												case null:
													return <Ionicons name='ios-add-outline' size={25} color='grey' />
												case '':
													return <ActivityIndicator />
												default:
													return (
														<Image source={{ uri: this.state.img_3.uri }} style={styles.avatar} resizeMode='contain' />
													)
											}
										})()
									}
									</View>
								</TouchableOpacity>
							</View>
							<View style={{ flexDirection: 'row' }} >
							<TouchableOpacity style={{ flex: 1 }} onPress={() => this._pickImage(4)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										(() => {
											switch (this.state.img_4) {
												case null:
													return <Ionicons name='ios-add-outline' size={25} color='grey' />
												case '':
													return <ActivityIndicator />
												default:
													return (
														<Image source={{ uri: this.state.img_4.uri }} style={styles.avatar} resizeMode='contain' />
													)
											}
										})()
									}
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ flex: 1 }} onPress={() => this._pickImage(5)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										(() => {
											switch (this.state.img_5) {
												case null:
													return <Ionicons name='ios-add-outline' size={25} color='grey' />
												case '':
													return <ActivityIndicator />
												default:
													return (
														<Image source={{ uri: this.state.img_5.uri }} style={styles.avatar} resizeMode='contain' />
													)
											}
										})()
									}
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ flex: 1 }} onPress={() => this._pickImage(6)} >
									<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
									{
										(() => {
											switch (this.state.img_6) {
												case null:
													return <Ionicons name='ios-add-outline' size={25} color='grey' />
												case '':
													return <ActivityIndicator />
												default:
													return (
														<Image source={{ uri: this.state.img_6.uri }} style={styles.avatar} resizeMode='contain' />
													)
											}
										})()
									}
									</View>
								</TouchableOpacity>
							</View>

							{/* <View style={ styles.container }>
        {
          (() => {
            switch (this.state.uploadURL) {
              case null:
                return null
              case '':
                return <ActivityIndicator />
              default:
                return (
                  <View>
                    <Image
                      source={{ uri: this.state.uploadURL }}
                      style={ styles.image }
                    />
                    <Text>{ this.state.uploadURL }</Text>
                  </View>
                )
            }
          })()
        }
        <TouchableOpacity onPress={ () => this._pickImage() }>
          <Text style={ styles.upload }>
            Upload
          </Text>
        </TouchableOpacity>
      </View> */}

							<Button
							full
							onPress={this.uploadAllImgs}
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   image: {
//     height: 200,
//     resizeMode: 'contain',
//   },
//   upload: {
//     textAlign: 'center',
//     color: '#333333',
//     padding: 10,
//     marginBottom: 5,
//     borderWidth: 1,
//     borderColor: 'gray'
//   },
// })
const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(Addplace)
