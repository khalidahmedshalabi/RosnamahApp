import React,{ Component }  from 'react'
import { Platform, I18nManager } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import { bgColor, secondColor,mainColor,borderColor,headerColor } from '../../constants/Colors';
import FontedText from '../FontedText';

const AVERAGE_STARS_COUNT = 2; // between 5 and 0, recommended: 2 or 2.5

export default class PostBox extends Component {

	determineStarIcon = (stars_count) => {
		if(stars_count < AVERAGE_STARS_COUNT)
			return ("star-outline");
		else if(stars_count < 5)
			return ("star-half");
		else
			return ("star");
	}

	render() {
		return (
			<View style={{ flex:1,borderColor:mainColor,borderWidth:.5, flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center' }}>
				<View style={{ flex: 1, paddingTop: 9, paddingRight:10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
				<View style={{flex:1,flexDirection:'row'}}>

				<FontedText style={{color:mainColor,fontSize: 15,textAlign:'right',justifyContent:'flex-end' }} text={this.props.name}/>


				</View>
					<View style={{ flex: 1 }}>
						<FontedText style={{  color: '#777777', fontSize: 12,textAlign:'right'}} text={this.props.desc} />
					</View>

					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}>



						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<MaterialCommunityIcons
								name="clock"
								size={20}
								color={secondColor}
							/>
							<Text
								style={{
									marginLeft: 4,

									fontSize: 10,
									color: secondColor
								}}>
								{this.props.time}
							</Text>
						</View>

						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<MaterialCommunityIcons
								name="comment"
								size={20}
								color={secondColor}
							/>
							<Text
								style={{
									marginLeft: 4,

									fontSize: 10,
									color: secondColor
								}}>
								{this.props.comments}
							</Text>
						</View>




					</View>
				</View>

				<View style={{ flex: 0.5 }}>
					<Image
						source={{ uri: this.props.image }}
						style={{ width: 100, height: 100, marginTop: 10, marginBottom: 11,
							marginRight: 4, borderRadius: 10 }}
							resizeMode="contain"
					/>
				</View>
			</View>
		);
	}
}
