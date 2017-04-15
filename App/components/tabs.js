import { Tabs, Tab, Icon } from 'react-native-elements'
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import IndexPage from './index';
import ProfilePage from './myProfilePage';
import Goals from './goals';

class ApplicationTabs extends Component {
	constructor() {
	  super()
	  this.state = {
	    selectedTab: 'indexpage',
	  }
	}
	changeTab (selectedTab) {
		  this.setState({selectedTab})
	}
	render() {

		const { selectedTab } = this.state


		return (
			<Tabs>
			  <Tab
			    titleStyle={{fontWeight: 'bold', fontSize: 10}}
			    selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
			    selected={selectedTab === 'indexpage'}
			    title={selectedTab === 'indexpage' ? 'MyPins' : null}
			    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='map' size={33} />}
			    renderSelectedIcon={() => <Icon color={'#6296f9'} name='map' size={30} />}
			    onPress={() => this.changeTab('indexpage')}>

			    			<IndexPage />
			  </Tab>
				<Tab
					titleStyle={{fontWeight: 'bold', fontSize: 10}}
					selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
					selected={selectedTab === 'goalsPage'}
					title={selectedTab === 'goalsPage' ? 'Goals' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='query-builder' size={33} />}
					renderSelectedIcon={() => <Icon color={'#6296f9'} name='query-builder' size={30} />}
					onPress={() => this.changeTab('goalsPage')}>

								<Goals />
				</Tab>
			  <Tab
			    titleStyle={{fontWeight: 'bold', fontSize: 10}}
			    selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
			    selected={selectedTab === 'profile'}
			    title={selectedTab === 'profile' ? 'PROFILE' : null}
			    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='person' size={33} />}
			    renderSelectedIcon={() => <Icon color={'#6296f9'} name='person' size={30} />}
			    onPress={() => this.changeTab('profile')}>

								<ProfilePage />
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
		activitiesPageState: state.get('activitiesPageState')
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
