import React, { Component, PropTypes } from 'react';
import { AppRegistry, ScrollView, StyleSheet, Text, View,
  TextInput, TouchableOpacity, NavigatorIOS, ListView, Dimensions, Alert, AsyncStorage, Image } from 'react-native';
import { Item, Input, Tab, Tabs,Spinner, List, ListItem, Left, Body, Button } from 'native-base';
import Swiper from 'react-native-swiper';
import randomcolor from 'randomcolor';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginAction from '../actions/loginAction';
import MapView from 'react-native-maps';

//Import navigation components
import CreatePin from './createPin'


class DetailedPin extends Component {
  constructor(props){
    super(props);
    console.log('DETAILED PINS PROPS', this.props)
    this.state ={
      join: false
    }
    console.log('PARAMETERS IN CONSTRUCTOR', this.props.marker._id, this.props.profile.userObject._id)
  }
  join(){
    console.log('I WANT TO JOIN')
    this.props.actions.joinActivity(this.props.marker._id, this.props.profile.userObject._id)
    console.log('PARAMETERS IN JOIN', this.props.marker._id, this.props.profile.userObject._id)
    this.setState({
      join: true
    })
  }
  render(){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Category: {this.props.marker.activityCategory}</Text>
      <Text>Title: {this.props.marker.activityTitle}</Text>
      <Text>Description: {this.props.marker.activityDescription}</Text>
      <Text>Duration: {this.props.marker.activityDuration} hr(s)</Text>
      <Text>Start Time: {this.props.marker.activityStartTime}</Text>
      <Text>Spots Available {this.props.marker.activityCapacity}</Text>
      {this.props.profile.userObject._id !== this.props.marker.activityCreator[0] ? (<View><Button success onPress={this.join.bind(this)}>
                      <Text> Join </Text>
      </Button>
      {this.state.join ? <Button danger onPress={this.join.bind(this)}>
                      <Text> Leave </Text>
      </Button> : null}</View>) : null}
      
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailedPin);
