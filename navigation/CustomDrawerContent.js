import React from 'react';
import {
	ScrollView,
	Image,
} from 'react-native'
import { DrawerItems } from 'react-navigation';


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
					({ route }) => props.translate(`DrawerItem_${route.key}`)
				}
				onItemPress={
					({ route }) => {
						// Close drawer first
						props.navigation.closeDrawer()

						if (route.key === 'Logout') {
							// Log out and send to login page
							props.navigation.navigate('Login', { DoNotSkip: true })
							return;
						}
	
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