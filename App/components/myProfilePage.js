import React, { Component, PropTypes } from 'react';
import {
  AppRegistry, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, NavigatorIOS,
  ListView, Alert, Image } from 'react-native';
import { Container, Content, Left, Body, Right, Text, ListItem, Thumbnail, Card, CardItem, Tabs, Tab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import styles from './styles';

import MapView from 'react-native-maps';
import { Button, SocialIcon } from 'react-native-elements'
import randomcolor from 'randomcolor';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginAction from '../actions/loginAction';

import { connect } from 'react-redux';



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
  }
  viewStyle() {
    return {
      flex: 2,
      backgroundColor: 'white',
      justifyContent: 'center'
    }
  }
  addFriend(){
    const {userObject} = this.props.profile;
    const {activitiesPageState, actions} =this.props;
    actions.sendFriendRequest(userObject._id , activitiesPageState.selectedActivityOwner)
  }
  render(){
    const {userObject} = this.props.profile;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(favs);


    if(userObject){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      const dataSource = ds.cloneWithRows(favs);

      const profileImg = userObject.profileImg;
      console.log('this is looking for the profile image',profileImg)
    }


    return (
        <View style={{flex: 1}}>
        { userObject !== null ? (  <Swiper
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
                  <View style={{flex: 1, backgroundColor: 'grey'}}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#00A8BE', padding: 10}}>
                      <View style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                      <Thumbnail style={{ height: 140, width: 140, borderRadius: 70}} source={{uri: userObject.profileImg }} />
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 18, marginTop: 5}}>{userObject.firstName + " " + userObject.lastName}</Text>
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
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 15, marginTop: 0}}>24</Text>
                      </View>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                      <Icon style={{flex: 1,fontSize: 35, color: '#41A36A', textAlign: 'center'}} name='ios-navigate'></Icon>
                      <View style={{flex: 2}}>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 12, marginTop: 5}}>Pins Attended</Text>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 15, marginTop: 0}}>5</Text>
                      </View>
                      </View>
                      </View>
                      </View>
                      <View style={{flex: 1, backgroundColor: '#00A8BE', padding: 10, marginTop: -10}}>
                      <ListView
                          dataSource={dataSource}
                          renderRow={(rowData) => <View style={{backgroundColor: 'white', marginBottom: 5, padding: 10}}>
                            <Text style={{fontWeight: '400', marginBottom: 5, fontSize: 15}}>{rowData.name}</Text>
                            <Image source={rowData.image} resizeMode="stretch" style={{width:null, height:200, justifyContent:'flex-end', alignItems:'center'}}>
                            </Image>
                            <Text style={{fontWeight: '400', marginTop: 5, fontSize: 12}}>A short description of the activity, popular sports played there, and how busy the area is on a specific day</Text>
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


function mapStateToProps(state) {
  console.log("this is state inside of ProfilePage: ", state)
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

