import React, { Component, PropTypes } from 'react';
import { AppRegistry, ScrollView, StyleSheet, Text, View,
  TextInput, TouchableOpacity, NavigatorIOS, ListView, Dimensions, Alert, AsyncStorage, Image } from 'react-native';
import { Item, Input, Tab, Tabs,Spinner, List, ListItem, Left, Body } from 'native-base';
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
import SelectedCategory from './selectedCategoryPage';

var image5 = {uri: 'https://www.thisiscolossal.com/wp-content/uploads/2016/03/finger-4.jpg'}
var image4 = {uri: 'https://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg'}
var image3 = {uri: 'https://iso.500px.com/wp-content/uploads/2016/04/STROHL__ST_1204-Edit-1500x1000.jpg'}
var image2 = {uri: 'https://static.pexels.com/photos/2855/landscape-mountains-nature-lake.jpg'}
var image1 = {uri: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Two_dancers.jpg'}


var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE = 1;
const LONGITUDE = 1;

const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MainPage extends Component {


  constructor(props){
    super(props);
      console.log('MAINPAGE PROPSSSSSS', this.props);
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
      backButtonTitle: 'Main',
      passProps: {
        latitude: this.state.currentPosition.latitude,
        longitude: this.state.currentPosition.longitude,
      }
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
  render() {
    // console.log('LAT initialPosition2', this.state.initialPosition.latitude )
    // // console.log('LONG initialPosition2', this.state.initialPosition.longitude )
    // console.log('LAT currentPosition2', this.state.currentPosition.latitude )
    // console.log('LONG currentPosition2', this.state.currentPosition.longitude )
    return(
      <View style={{flex: 1}}>
      {this.state.currentPosition.latitude !== 1 && this.state.currentPosition.longitude !== 1 ? (

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
       <MapView.Marker
         coordinate={{latitude: this.state.currentPosition.latitude,
         longitude: this.state.currentPosition.longitude,
         latitudeDelta: this.state.currentPosition.latitudeDelta,
         longitudeDelta: this.state.currentPosition.longitudeDelta,
         }}
         title='Title'

      />
      <View style={{flex: 0, alignItems: 'center'}}>
      <TouchableOpacity onPress={this.category.bind(this)}>
      <Text
      style={{borderColor: 'white', borderWidth: 1,borderColor: 'transparent', marginTop: 150, backgroundColor: '#00A8BE', width: 275, padding: 15, color: 'white', textAlign: 'center', fontSize: 20}}
      placeholder= 'Select a category'
      >Find things to do... {this.state.lastPosition}</Text>
      </TouchableOpacity>
      </View>
      {this.props.profile.userObject !== null ? (<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Text style={{fontSize: 12, backgroundColor: 'transparent', fontWeight: '500' }}>Add Location</Text>
        <View style={{flex: 0, marginBottom: 60, backgroundColor: '#00A8BE', width: 50, height: 50,
        alignItems: 'center', justifyContent: 'center', borderRadius: 25}}>
          <TouchableOpacity onPress={this.createPin.bind(this)}>
            <Icon style={{fontSize: 35, color: 'white'}} name='md-add'/>
          </TouchableOpacity>
        </View>
      </View>) : null }

      </MapView>
    ) : null}
      </View>
    )
  }
}
var sports = [{name: 'Baseball',
              iconName: 'ios-baseball'
              },
              {name: 'Basketball',
             iconName: 'md-basketball'
              },
               {name: 'Beach Volleyball',
             iconName: 'ios-basketball'
              },
               {name: 'Football',
             iconName: 'ios-american-football'
              },
               {name: 'Hiking',
             iconName: 'ios-walk'
              },
               {name: 'Running',
             iconName: 'md-walk'
              },
               {name: 'Soccer',
               iconName: 'ios-football'
              },
               {name: 'Tennis',
             iconName: 'ios-tennisball'

              },

           ];


class Categories extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(sports),

    }
    console.log('CATEGORIESSSSSSS PROPS', this.props)

  }
  selectCategory(rowData){
    console.log('Categories', rowData)
    this.props.navigator.push({
      component: SelectedCategory,
      backButtonTitle: 'Categories Page',
      passProps: {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        category: rowData.name
      }
    })

  }
  render(){
    return (
      <View style={{flex: 1}}>
      <Text style={{marginTop: 45, marginBottom: -40, textAlign: 'center', fontSize: 20, fontWeight: '500', backgroundColor: '#00A8BE', color: 'white', padding: 10}}>Select a category</Text>
      <List>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>

                <ListItem>
                  <TouchableOpacity onPress={this.selectCategory.bind(this, rowData)}>
                    <Left>
                    <Icon style={{fontSize: 30, color: 'grey', marginRight: 10}} name={rowData.iconName}/>
                    <Text style={{marginTop: 8}}>{rowData.name}</Text>
                    </Left>

                  </TouchableOpacity>
                </ListItem>

        }
      />
      </List>

      </View>
    )


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 10,
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
