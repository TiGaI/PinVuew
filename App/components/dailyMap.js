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




var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE = 1;
const LONGITUDE = 1;

const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class DailyMap extends Component {


  constructor(props){
    super(props);
      console.log('DAILY MAP PROPSSSSSS', this.props);
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
  mapData(){
    console.log('GETS INSIDE MAP FUNTION',  this.props.dailyData)
    var x = this.props.dailyData;
    var categoryArray = ['Entertainment', 'Exercise', 'Food', 'Hobbies', 'Relaxing', 'Studying'];
    return categoryArray.map(function(categoryName){
      console.log('XXXX', x)
      for(var key in x){
        console.log("KEY", key, categoryName)
        if(key === categoryName){
          console.log('INSIDE IF', categoryName )
          console.log('INSIDE IF CHECK ARRAY',   key.activities, x[key] )
        return x[key].activities.map(function(coordinates){
          console.log('gets in map coords', coordinates)
        return(
          <View>
            <MapView.Marker
              coordinate={{latitude: coordinates.activityLatitude,
              longitude: coordinates.activityLongitude
              }}
              title = {coordinates.activityTitle}
           />
          </View>
        );
        console.log('SUCCCESSS')
      })
      }

    }
    })
  }
  test(){
    var arr = ['1','2','3'];
    arr.map(function(x){
      return (
        <View style={{flex: 1, justifyContent: 'center'}}><Text>fafeafa</Text></View>
      )
    })

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

render() {
  console.log('LAT initialPosition2', this.state.initialPosition.latitude )
  console.log('LONG initialPosition2', this.state.initialPosition.longitude )
  console.log('LAT currentPosition2', this.state.currentPosition.latitude )
  console.log('LONG currentPosition2', this.state.currentPosition.longitude )

  return(
    <View style={{flex: 1}}>
    {this.state.currentPosition.latitude !== 1 ? (

      <View style={{flex: 1}}>

      <MapView
       resizeMode = "stretch"
        style={{flex: 1, height: null, width: null}}
        initialRegion={{
          latitude: this.state.currentPosition.latitude,
          longitude: this.state.currentPosition.longitude,
          latitudeDelta: this.state.currentPosition.latitudeDelta,
          longitudeDelta: this.state.currentPosition.longitudeDelta,
        }}
      >
      {this.mapData()}

      </MapView>
      </View>

    ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(DailyMap);
