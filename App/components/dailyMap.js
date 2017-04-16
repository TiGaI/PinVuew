import React, { Component, PropTypes } from 'react';
import { AppRegistry, ScrollView, StyleSheet, Text, View,
  TextInput, TouchableOpacity, NavigatorIOS, TouchableHighlight, ListView, Dimensions, Alert, AsyncStorage, Image } from 'react-native';
import { Item, Input, Tab, Tabs,Spinner, List, ListItem, Left, Right, Body } from 'native-base';
import Swiper from 'react-native-swiper';
import randomcolor from 'randomcolor';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginAction from '../actions/loginAction';
import MapView from 'react-native-maps';

//Import navigation components




// var { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
//
// const LATITUDE = 1;
// const LONGITUDE = 1;
//
// const LATITUDE_DELTA = 0.03;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class DailyMap extends Component {


  constructor(props){
    super(props);
      console.log('SELECTED CATEGORIESSSSS PROPSSSSSS', this.props);
    this.state = {
      initialPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      currentPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },

    }
    // this.props.actions.getPingAroundMe(this.props.category, this.props.longitude, this.props.latitude )
  }
//   componentDidMount(){
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         var initialPosition = JSON.stringify(position);
//         this.setState({initialPosition: {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA
//
//         }});
//
//       },
//       (error) => alert(error.message),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 0}
//     );
//       this.watchID = navigator.geolocation.watchPosition((position) => {
//       var currentPosition = JSON.stringify(position);
//       this.setState({currentPosition: {
//         latitude: (position.coords.latitude) / 1.00022741,
//         longitude: position.coords.longitude - 0.001,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA
//       }});
//
//     });
//   }
//   componentWillUnmount (){
//   navigator.geolocation.clearWatch(this.watchID);
// }
//   category(){
//     this.props.navigator.push({
//       component: Categories,
//       backButtonTitle: 'Main'
//     })
//   }
//   createPin(){
//     this.props.navigator.push({
//       component: CreatePin,
//       backButtonTitle: 'MainPage',
//       passProps: {
//         latitude: this.state.latitude,
//         longitude: this.state.longitude
//       }
//     })
//   }
//   detailedPin(marker){
//     this.props.navigator.push({
//       component: DetailedPin,
//       backButtonTitle: 'Category Pins',
//       passProps: { marker: marker }
//     })
//   }
  render() {

    return(<View style={{flex: 1}}><Text>HHelefafa</Text></View>)
  }
}

function mapStateToProps(state) {
    return {
        login: state.get('login'),
        profile: state.get('profile'),
        activitiesPageState: state.get('activityPageState')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
        loginActions: bindActionCreators(loginAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyMap);
