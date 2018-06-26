import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux';
import LazyContainer from '../../components/LazyContainer'
import { bgColor } from '../../constants/Colors';
import MainHeader from '../../components/MainHeader'
import NoContent from '../../components/NoContent'
import CategoryBox from '../../components/CategoriesPlaces/CategoryBox.js'

class MyVisits extends Component {
	constructor(props) {
		super(props);

		this.state = {
			places: [
			]
		}
	}
	componentDidMount() {
		// replace with users visits endpoint
		/*GET('Categories?parent_id=0',
			res => {
				// on success
				this.setState({ places: res.data.response })
			},
			err => {
				// on failure
			},
			false // should authorise this request?
		)*/
	}

	render() {
		const { navigation } = this.props

		return (
			<LazyContainer style={{ flex: 1, backgroundColor: bgColor }}>
				<MainHeader navigation={navigation} />
				<FlatList
					contentContainerStyle={{ paddingVertical: 12 }}
					data={this.state.places}
					style={{ flex: 1 }}
					ItemSeparatorComponent={
						() => <View style={{ height: 10, backgroundColor: 'white' }}></View>
					}
					ListEmptyComponent={
						<NoContent />
					}
					renderItem={({ item, index }) => (
						<TouchableOpacity activeOpacity={.8} 
							onPress={() => navigation.navigate({
								routeName: 'CategoriesPlaces',
								params: {
									key: item.key
								},
								key: item.key
							})}>
							<CategoryBox
								title={item.name}
								image={item.img}
							/>
						</TouchableOpacity>
					)}
				/>
			</LazyContainer>
		)
	}
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
})

export default connect(mapStateToProps)(MyVisits)
