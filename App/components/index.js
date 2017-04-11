
import React, { Component } from 'react';
import { NavigatorIOS, View } from 'react-native';

import MainPage from './mainPage'

export default class Index extends Component {
  render(){
    const {actions } = this.props;
      return (
        <View style={{flex:1}}>
          <NavigatorIOS
          style={{flex: 1}}
          initialRoute={{
              component: MainPage,
              title: 'MainPage',
              showTabBar: true
            }}
            navigationBarHidden={false}>
          </NavigatorIOS>
        </View>
      )
    }
}
module.exports = Index;
