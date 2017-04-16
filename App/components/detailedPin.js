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
import CreatePin from './createPin';
import MainPage from './mainPage';
import EditPinForm from './editPinForm'


class DetailedPin extends Component {
  constructor(props){
    super(props);
    console.log('DETAILED PINS PROPS', this.props)
    this.state ={
      join: false,
      leave: false
    }

  }
  leave(){
    console.log('I WANT TO LEAVE');
    this.props.actions.leaveActivity(this.props.marker._id, this.props.profile.userObject._id);
    this.setState({
      leave: true
    })
  }
  join(){
    console.log('I WANT TO JOIN');
    this.props.actions.joinActivity(this.props.marker._id, this.props.profile.userObject._id)
    console.log('PARAMETERS IN JOIN', this.props.marker._id, this.props.profile.userObject._id)
    this.setState({
      leave: true
    })
  }
  delete(){
    console.log('I WANT TO DELETE THIS');
      Alert.alert(
        'Sure you want to delete?',
        'Confirm',
        [
          {text: 'Yes', onPress: () => {this.props.actions.deleteActivity(this.props.marker._id, this.props.marker.activityCreator[0]); this.props.navigator.replace({
            component: MainPage
          })}},
          {text: 'No', onPress: () => console.log('Selected No on Delete Button')}
        ],
        { cancelable: false }
      )
  }
  edit(){
    console.log('I WANT TO EDIT THIS')
    this.props.navigator.replace({
      component: EditPinForm,
      passProps: this.props.marker
    })
  }
  render(){
    var userHasJoined;
    if(this.props.profile.userObject !== null && this.props.marker.checkInUser.length > 0){
      this.props.marker.checkInUser.map(function(x){
        if(x === this.props.profile.userObject._id.bind(this)){
          var userHasJoined = 1;
        }
      })
    }

    return (
      <View style={{flex: 1}}>
      {this.props.profile.userObject === null ? (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Category: {this.props.marker.activityCategory}</Text>
      <Text>Title: {this.props.marker.activityTitle}</Text>
      <Text>Description: {this.props.marker.activityDescription}</Text>
      <Text>Duration: {this.props.marker.activityDuration} hr(s)</Text>
      <Text>Start Time: {this.props.marker.activityStartTime}</Text>
      </View>)
      : (  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {this.props.profile.userObject._id === this.props.marker.activityCreator[0] ?
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={this.delete.bind(this)}>
          <Icon name='md-trash' style={{color: 'red', fontSize: 30, margin: 10}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.edit.bind(this)}>
          <Icon name='md-create' style={{color: 'green', fontSize: 30, margin: 10}}/>
          </TouchableOpacity>
          </View> : null}
        <Text>Category: {this.props.marker.activityCategory}</Text>
        <Text>Title: {this.props.marker.activityTitle}</Text>
        <Text>Description: {this.props.marker.activityDescription}</Text>
        <Text>Duration: {this.props.marker.activityDuration} hr(s)</Text>
        <Text>Start Time: {this.props.marker.activityStartTime}</Text>
        <Text>Spots Available {this.props.marker.activityCapacity - this.props.marker.checkInUser.length}</Text>
        {this.props.profile.userObject._id !== this.props.marker.activityCreator[0] ? (<View>{this.state.leave === false && userHasJoined ? <Button block success onPress={this.join.bind(this)}>
                        <Text> Join </Text>
        </Button> : <Button block danger onPress={this.leave.bind(this)}>
                        <Text> Leave </Text>
        </Button> }
        {this.state.join ? <Button block danger onPress={this.leave.bind(this)}>
                        <Text> Leave </Text>
        </Button> : null}</View>) : null}

        </View>) }
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
