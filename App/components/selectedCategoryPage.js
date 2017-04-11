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
import DetailedPin from './detailedPin';



var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE = 1;
const LONGITUDE = 1;

const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class SelectedCategory extends Component {


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
    console.log('TESTING',this.props.category, this.props.longitude, this.props.latitude )
    this.props.actions.getPingAroundMe(this.props.category, this.props.longitude, this.props.latitude )
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA

        }});

      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 0}
    );
      this.watchID = navigator.geolocation.watchPosition((position) => {
      var currentPosition = JSON.stringify(position);
      this.setState({currentPosition: {
        latitude: (position.coords.latitude) / 1.00022741,
        longitude: position.coords.longitude - 0.001,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }});

    });
  }
  componentWillUnmount (){
  navigator.geolocation.clearWatch(this.watchID);
}
  category(){
    this.props.navigator.push({
      component: Categories,
      backButtonTitle: 'Main'
    })
  }
  createPin(){
    this.props.navigator.push({
      component: CreatePin,
      backButtonTitle: 'MainPage',
      passProps: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
    })
  }
  detailedPin(marker){
    this.props.navigator.push({
      component: DetailedPin,
      backButtonTitle: 'Category Pins',
      passProps: { marker: marker }
    })
  }
  render() {
    // console.log('LAT initialPosition2', this.state.initialPosition.latitude )
    // // console.log('LONG initialPosition2', this.state.initialPosition.longitude )
    // console.log('LAT currentPosition2', this.state.currentPosition.latitude )
    // console.log('LONG currentPosition2', this.state.currentPosition.longitude )
    console.log('SELECTED CATEGORIESSSSS PROPSSSSSS AFTER ', this.props);
    if(this.props.profile.userObject === null){
      var newVariable = 1;
    }else{
      var newVariable = this.props.profile.userObject._id
    }

    return(
      <View style={{flex: 1}}>
      {this.state.currentPosition.latitude !== 1 && this.state.currentPosition.longitude !== 1 && this.props.activitiesPageState.populatedActivities.length > 0 ? (

      <MapView
       resizeMode = "stretch"
        style={{flex: 1, height: null, width: null, alignItems: 'center'}}
        initialRegion={{
          latitude: this.state.currentPosition.latitude,
          longitude: this.state.currentPosition.longitude,
          latitudeDelta: this.state.currentPosition.latitudeDelta,
          longitudeDelta: this.state.currentPosition.longitudeDelta,
        }}
      >
      {this.props.activitiesPageState.populatedActivities.map(marker => (
      <MapView.Marker
      coordinate={{latitude: marker.activityLatitude,
      longitude: marker.activityLongitude
      }}
      pinColor={(marker.activityCreator[0] === newVariable && marker.activityCreator[0] !== null  && newVariable !== null  ) ? 'green' : 'red'}
      >
        <MapView.Callout style={{width:120, height:25}}>
          <TouchableOpacity
              onPress={this.detailedPin.bind(this, marker)}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: '500', textAlign: 'left'}}>{marker.activityCategory}</Text>
              <Text>Spots remaining {marker.activityCapacity}</Text>
            </View>
          </TouchableOpacity>
        </MapView.Callout>
      </MapView.Marker>
    ))}
      <View style={{flex: 0, alignItems: 'center'}}>
      <TouchableOpacity onPress={this.category.bind(this)}>
      <Text
      style={{borderColor: 'white', borderWidth: 1,borderColor: 'transparent', marginTop: 45, backgroundColor: '#00A8BE', padding: 15, color: 'white', textAlign: 'center', fontSize: 20, borderRadius: 10}}
      placeholder= 'Select a category'
      >{this.props.category}</Text>
      </TouchableOpacity>
      </View>


      </MapView>
    ) : (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Spinner color='blue' /></View> )}
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCategory);
