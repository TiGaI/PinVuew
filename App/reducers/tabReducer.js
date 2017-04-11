import { tabReducer } from 'react-native-navigation-redux-helpers';

const tabs = {
  routes: [
    { key: 'search', icon: require('../../assets/image/globe.png'), title: '' },
    { key: 'notifications', icon: require('../../assets/image/notifications.png'), title: '' },
		{ key: 'profile', icon: require('../../assets/image/profile.png'), title: '' },
  ],
  key: 'ApplicationTabs',
  index: 0
};

module.exports = tabReducer(tabs);
