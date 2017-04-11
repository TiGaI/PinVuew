import { View, Text, TabBarIOS, TouchableOpacity } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
// import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
// const { jumpTo } = navigationActions;
import IndexPage from './index';
import ProfilePage from './myProfilePage';
import Notifications from './notifications';

class ApplicationTabs extends Component {
	// _renderTabContent(tab) {
	// 	if (tab.key === 'search') {
	// 		return (
	// 			<IndexPage />
	// 		);
	// 	}
	//
	// 	if (tab.key === 'notifications') {
	// 		return (
	// 	     <Notifications />
	// 		);
	// 	}
	//
	// 	if (tab.key === 'profile') {
	//
	// 		return (
	// 			<ProfilePage />
	// 		);
	// 	}
	//
	// 	return <Text>SOmething went wrong</Text>;
	// }

	render() {
		// const { dispatch, navigation, indexPage } = this.props;
		// const children = navigation.routes.map( (tab, i) => {
		// 	return (

		// 		<TabBarIOS.Item key={tab.key}
		// 				icon={tab.icon}
		// 				selectedIcon={tab.selectedIcon}
		// 				title={tab.title} onPress={ () => dispatch(jumpTo(i, navigation.key)) }
		// 				selected={this.props.navigation.index === i}>
		// 				{ this._renderTabContent(tab) }
		// 		</TabBarIOS.Item>
		// 	);
		// });
		// <TabBarIOS
		// 	unselectedTintColor='black'
		// 	tintColor='black'
		// 	unselectedItemTintColor="gray"
		// 	barTintColor='white'>
		// 	{children}
		// </TabBarIOS>

		const { selectedTab } = this.state

		return (



			<Tabs>
			  <Tab
			    titleStyle={{fontWeight: 'bold', fontSize: 10}}
			    selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
			    selected={selectedTab === 'feed'}
			    title={selectedTab === 'feed' ? 'FEED' : null}
			    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='whatshot' size={33} />}
			    renderSelectedIcon={() => <Icon color={'#6296f9'} name='whatshot' size={30} />}
			    onPress={() => this.changeTab('feed')}>
			    { this._renderTabContent(tab) }
			  </Tab>
			</Tabs>
		);
	}
}

ApplicationTabs.propTypes = {
    onPress: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('tabs'),
		activitiesPageState: state.get('activitiesPageState')
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
