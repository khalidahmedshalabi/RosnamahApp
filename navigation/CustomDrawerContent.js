import React from 'react';
import {
	ScrollView,
	View,
	Image,
	Text,
	ImageBackground,
	TouchableOpacity,
} from 'react-native'
import { DrawerItems } from 'react-navigation';

import { mainColor } from '../constants/Colors'

import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const CustomDrawerContentComponent = (props) => {
	const { items, ...rest } = props;
	const filteredItems = props.store_admin ? items : items.filter(item => item.key !== "MyProducts");

	return (
		<ScrollView style={{ backgroundColor: '#fff', flex: 1, }}>
                <Image source={ require('../assets/images/drawer_banner.png')}
                    
					style={{ width: '100%', height: 100, paddingVertical: 30 }} />
				
			<DrawerItems
				{...props}
				items={filteredItems} {...rest}
				getLabel={
					({ route, focused }) => props.translate(`DrawerItem_${route.key}`)
				}
				onItemPress={
					({ route, focused }) => {
						if (route.key === 'Logout') {
							// Log out and send to login page
							props.navigation.navigate('Login', { DoNotSkip: true })
							return;
						}
	
						// Close drawer first
						props.navigation.navigate('DrawerClose')
	
						// Then navigate
						requestAnimationFrame(() => props.navigation.navigate(route))
					}
				} />
		</ScrollView>
	);
}

const mapStateToProps = (state) => ({
	translate: getTranslate(state.locale),
	store_admin: state.login ? state.login.store_admin : false
})

module.exports = connect(mapStateToProps)(CustomDrawerContentComponent);