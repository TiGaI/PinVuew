import React, { Component, PropTypes } from 'react';
import {
  AppRegistry, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, NavigatorIOS,
  ListView, ListViewDataSource, Alert, Image, Animated, Dimensions } from 'react-native';
import { Container, Content, Left, Body, Right, Text, ListItem, Thumbnail, Card, CardItem, Tabs, Tab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import styles from './styles';

import MapView from 'react-native-maps';
import { Button, SocialIcon } from 'react-native-elements'
import randomcolor from 'randomcolor';

var {height, width} = Dimensions.get('window');

import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginAction from '../actions/loginAction';


import { connect } from 'react-redux';

//Import navigation components
import DailyMap from './dailyMap';



var image5 = {uri: 'https://www.thisiscolossal.com/wp-content/uploads/2016/03/finger-4.jpg'}
var image4 = {uri: 'https://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg'}
var image3 = {uri: 'https://iso.500px.com/wp-content/uploads/2016/04/STROHL__ST_1204-Edit-1500x1000.jpg'}
var image2 = {uri: 'https://static.pexels.com/photos/2855/landscape-mountains-nature-lake.jpg'}
var image1 = {uri: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Two_dancers.jpg'}

var favs = [
{name:"DANCE", homes : 18, image: image1},
{name:"OUTDOORS", homes : 4, image: image2},
{name:"TRAVEL", homes : 5, image: image3},
{name:"ART", homes : 22, image: image4},
{name:"ART", homes : 18, image: image5}
]


class ProfilePage extends Component{
  constructor(props){
    super(props)
    // this.props.actions.getAllUserActivities(this.props.profile.userObject._id)
    this.props.loginActions.getGraphData(this.props.profile.userObject._id, this.props.profile.userObject.myActivity)
    console.log('PROFILE PAGE PROPSSSSS', this.props)
  }
  viewStyle() {
    return {
      flex: 2,
      backgroundColor: 'white',
      justifyContent: 'center'
    }
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
  dailyMap(rowData){
    this.props.navigator.push({
      component: DailyMap,
      title: 'ProfilePAge',
      passProps: {dailyData: rowData}
    })
  }

  render(){
    // const {userObject} = this.props.profile;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    // var dataSourceMain = '';
    //
    var x = 1;
    // if(this.props.profile.userObject.sortedPing){
    //   x = 1;
    //   var goalFinished = totalHoursArray;
    //   console.log('SORRREEETTTEEDD', this.props.profile.userObject.sortedPing)
      dataSourceMain = ds.cloneWithRows(this.props.profile.userObject.sortedPing)
    // }



    return (
        <View style={{flex: 1}}>
        { x === x ? (  <Swiper
            loop={false}
            showsPagination={false}
            index={1}>

            <Swiper
              horizontal={false}
              loop={false}
              showsPagination={false}
              index={1}>
              <View style={this.viewStyle()}>
                <Container>
                  <Content>
                  <View style={{flex: 1, backgroundColor: '#07263B'}}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#00A8BE', padding: 0}}>
                      <View style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                      <Thumbnail style={{ height: 100, width: 100, borderRadius: 50}} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Two_dancers.jpg'}} />
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 18, marginTop: 5}}>kjhjhbhjgvjcyfc</Text>
                      </View>

                      <View style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center', padding: 10}}>

                      <View style={{flex: 1, flexDirection: 'row'}}>
                      <Icon style={{fontSize: 35, color: '#00A8FF', flex: 1, textAlign: 'center'}} name='md-people'></Icon>
                      <View style={{flex: 2}}>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 12, marginTop: 5}}>Followers</Text>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 15, marginTop: 0}}>1,023</Text>
                      </View>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                      <Icon style={{flex: 1,fontSize: 35, color: '#FF514E', textAlign: 'center'}} name='md-pin'></Icon>
                      <View style={{flex: 2}}>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 12, marginTop: 5}}>Pins Created</Text>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 15, marginTop: 0}}>123</Text>
                      </View>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                      <Icon style={{flex: 1,fontSize: 35, color: '#41A36A', textAlign: 'center'}} name='ios-timer'></Icon>
                      <View style={{flex: 2}}>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 12, marginTop: 5}}>Pinned Hours</Text>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 15, marginTop: 0}}>12</Text>
                      </View>
                      </View>
                      </View>
                      </View>
                      <View style={{flex: 1, backgroundColor: 'white', padding: 5, marginTop: 0}}>
                      <ListView
                          dataSource={dataSourceMain}
                          renderRow={(rowData) => <View style={{backgroundColor: '#07263B', marginBottom: 5, padding: 0, backgroundColor: 'grey'}}>
                                    {console.log('ROOOWWWW', rowData)}
                                    <View style={{backgroundColor: '#28B19D', width: width, padding: 10}}>
                                      <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>STATS OVERVIEW</Text>
                                    </View>
                                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 5, backgroundColor: '#07263B'}}>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={{color: 'white', fontSize: 15}}>Entertainment.</Text>
                                        <View style={styled.data}>

                                            <Animated.View style={[styled.bar, styled.Entertainment, {width: (!rowData.Entertainment) ? (5) : (rowData.Entertainment.totalHoursForThisCategory)*20}]} />

                                          <Text style={styled.dataNumber}>{(!rowData.Entertainment) ? (0) : (rowData.Entertainment.totalHoursForThisCategory)}</Text>
                                        </View>
                                  </View>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={{color: 'white', fontSize: 15}}>Exercise</Text>
                                        <View style={styled.data}>

                                            <Animated.View style={[styled.bar, styled.Exercise, {width: (!rowData.Exercise) ? (5) : (rowData.Exercise.totalHoursForThisCategory)*20}]} />

                                          <Text style={styled.dataNumber}>{(!rowData.Exercise) ? (0) : (rowData.Exercise.totalHoursForThisCategory)}</Text>
                                        </View>
                                  </View>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={{color: 'white', fontSize: 15}}>Food</Text>
                                        <View style={styled.data}>

                                            <Animated.View style={[styled.bar, styled.Food, {width: (!rowData.Food) ? (5) : (rowData.Food.totalHoursForThisCategory)*20}]} />

                                          <Text style={styled.dataNumber}>{(!rowData.Food) ? (0) : (rowData.Food.totalHoursForThisCategory)}</Text>
                                        </View>
                                  </View>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={{color: 'white', fontSize: 15}}>Hobbies</Text>
                                        <View style={styled.data}>

                                            <Animated.View style={[styled.bar, styled.Hobbies, {width: (!rowData.Hobbies) ? (5) : (rowData.Hobbies.totalHoursForThisCategory)*20}]} />

                                          <Text style={styled.dataNumber}>{(!rowData.Hobbies) ? (0) : (rowData.Hobbies.totalHoursForThisCategory)}</Text>
                                        </View>
                                  </View>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={{color: 'white', fontSize: 15}}>Relaxing</Text>
                                        <View style={styled.data}>

                                            <Animated.View style={[styled.bar, styled.Relaxing, {width: (!rowData.Relaxing) ? (5) : (rowData.Relaxing.totalHoursForThisCategory)*20}]} />

                                          <Text style={styled.dataNumber}>{(!rowData.Relaxing) ? (0) : (rowData.Relaxing.totalHoursForThisCategory)}</Text>
                                        </View>
                                  </View>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={{color: 'white', fontSize: 15}}>Studying</Text>
                                        <View style={styled.data}>

                                            <Animated.View style={[styled.bar, styled.Studying, {width: (!rowData.Studying) ? (5) : (rowData.Studying.totalHoursForThisCategory*10)}]} />

                                          <Text style={styled.dataNumber}>{(!rowData.Studying) ? (0) : (rowData.Studying.totalHoursForThisCategory)}</Text>
                                        </View>
                                  </View>

                                  </View>
                                  <View style={{backgroundColor: '#FC4F48', width: width, padding: 10}}>
                                    <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>DAILY OVERVIEW</Text>
                                  </View>

                                  <View style={{flexDirection: 'row',backgroundColor: '#07263B', padding: 10}}>
                                    <Icon style={{flex: 1,fontSize: 30, color: '#FF514E', textAlign: 'center'}} name='md-pie'>{"\n"}<Text style={{color: 'white', fontSize: 12}}>Hours {rowData.totalHoursPerDay}</Text></Icon>
                                    <Icon style={{flex: 1,fontSize: 30, color: '#FF514E', textAlign: 'center'}} name='md-pin'>{"\n"}<Text style={{color: 'white', fontSize: 12}}>Pins {rowData.totalPinsPerDay}</Text></Icon>
                                    <Icon style={{flex: 1,fontSize: 30, color: '#FF514E', textAlign: 'center'}} name='md-calendar'>{"\n"}<Text style={{color: 'white', fontSize: 12}}>Date {rowData.date}</Text></Icon>
                                    <Icon onPress={this.dailyMap.bind(this, rowData)} style={{flex: 1,fontSize: 30, color: '#FF514E', textAlign: 'center'}} name='md-map'>{"\n"}<Text style={{color: 'white', fontSize: 12}}>Map</Text></Icon>
                                  </View>


                            </View>

                          }

                      />
                      </View>
                    </View>
                  </Content>
                </Container>
              </View>


            </Swiper>

          </Swiper>
) : (

  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00A8BE'}}>

<Text style={{fontSize: 20, color: 'white'}}>Login to view profile</Text>
    <View style={{  flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
   flexDirection: 'row'}}>

      <SocialIcon
        light
        type='facebook'
        onPress={this.props.facebook}
      />

      <SocialIcon
        light
        type='google'
      />

    </View>
  </View>

)}
        </View>
    )
  }
}



// ProfilePage.propTypes = {
//     facebook: PropTypes.func.isRequired,
//     onSkip: PropTypes.func.isRequired
// };
const styled = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6
  },
  // Item
  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  label: {
    color: 'white',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    top: 2
  },
  data: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    width: width*0.90,
    backgroundColor: 'white'
  },
  dataNumber: {
    color: 'black',
    fontSize: 7
  },
  // Bar
  bar: {
    alignSelf: 'flex-start',
    borderRadius: 0,
    height: 20,
    marginRight: 5

  },
  Entertainment: {
    backgroundColor: '#F55443'
  },
  Exercise: {
    backgroundColor: '#FCBD24'
  },
  Food: {
    backgroundColor: '#59838B'
  },
  Hobbies: {
    backgroundColor: '#4D98E4'
  },
  Relaxing: {
    backgroundColor: '#418E50'
  },
  Studying: {
    backgroundColor: '#7B7FEC'
  },
  minutes: {
    backgroundColor: '#3ABAA4'
  },
  // controller
  controller: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  button: {
    flex: 1,
    position: 'relative',
    top: -1
  },
  chevronLeft: {
    alignSelf: 'flex-end',
    height: 28,
    marginRight: 10,
    width: 28
  },
  chevronRight: {
    alignSelf: 'flex-start',
    height: 28,
    marginLeft: 10,
    width: 28
  },
  date: {
    color: '#6B7C96',
    flex: 1,
    fontSize: 22,
    fontWeight: '300',
    height: 28,
    textAlign: 'center'
  }

})


function mapStateToProps(state) {
  console.log("this is state inside of ProfilePage: ", state)
    return {
        login: state.get('login'),
        profile: state.get('profile'),
        activitiesPageState: state.get('activityPageState'),
        goal: state.get('goal')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
        loginActions: bindActionCreators(loginAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
