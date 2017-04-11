import React, { Component, PropTypes } from 'react';
import {
  AppRegistry, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, NavigatorIOS,
  ListView, Alert, Image } from 'react-native';
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import { connect } from 'react-redux';


class Notifications extends Component{
  constructor(props){
    super(props);
  }

}

function mapStateToProps(state) {
	return {
		navigation: state.get('tabs'),
    profile: state.get('profile')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
