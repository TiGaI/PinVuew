import React, { Component, PropTypes } from 'react';
import {
  AppRegistry, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, NavigatorIOS,
  ListView, Alert, Image } from 'react-native';
import { Container, Content, Left, Body, Right, Text, ListItem, Thumbnail, Card, CardItem, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'
import styles from './styles'

import MapView from 'react-native-maps';
import randomcolor from 'randomcolor';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginCreators from '../actions/loginAction';
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

class DetailEvent extends Component{
  constructor(props){
    super(props);
  }
  viewStyle() {
    return {
      flex: 2,
      backgroundColor: 'white',
      justifyContent: 'center'
    }
  }
  joinActivity() {

      // var copy = Object.assign({}, value);
      // copy["activityCreator"] = this.props.profile.id
      // console.log("this is copy: ", copy)
      //  fetch("http://localhost:8080/joinActivity", {
      //    method: 'POST',
      //    headers: {
      //      "Content-Type": "application/json"
      //    },
      //    body: JSON.stringify({
      //      activity: copy
      //    })
      //  })
  }
  addFriend(){
    const {userObject} = this.props.profile;
    const {activityCreator, actions} =this.props;
    actions.sendFriendRequest(userObject._id , activityCreator[0]._id);
  }
  render(){
    const {userObject} = this.props.profile;
    const {activitiesPageState} = this.props;
    const {selectedActivityOwner} = activitiesPageState;
    const {selectedActivity} = activitiesPageState;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows([]);

   var activityObject = this.props

   if(userObject.length > 0){
     const profileImg = userObject.profileImg
    //  console.log('this is looking for the profile image', profileImg)
     var alreadyFriend = false
     var connectionLength = this.props.profile.userObject.connection.filter(
       function(x){
         return x === userObject[0].id
       }).length

     if(userObject._id === this.props.userObject.profile.id || connectionLength > 0){
       alreadyFriend = true
     }
   }

   return (
       <View>
       { activitiesPageState.selectedActivityOwner ? (  <Swiper
           loop={false}
           showsPagination={false}
           index={0}>

           <Swiper
             horizontal={false}
             loop={false}
             showsPagination={false}
             index={0}>

             <View style={this.viewStyle()}>
               <Container>
                 <Content>
                   <View style={styles.profileBox}>
                     <Thumbnail style={{marginTop: 50, height: 100, width: 100, borderRadius: 50}} source={{uri: selectedActivityOwner.profileImg }} />
                     <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 25, marginTop: 5}}>{selectedActivityOwner.firstName + " " + selectedActivityOwner.lastName}</Text>

                     <View style={{flex: 1, flexDirection: 'row'}}>
                       <TouchableOpacity style={{flex: 1}} onPress={this.addFriend.bind(this)}>
                       <View style={{flex: 1, backgroundColor: '#00A8BE', alignItems: 'center', padding: 15,
                        margin: 10, borderRadius: 35}}>
                        <Text style={{color: 'white', fontWeight: '500', letterSpacing: 1}}>FOLLOW</Text>
                        </View>
                         </TouchableOpacity>
                         <TouchableOpacity style={{flex: 1}} >
                         <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 15,
                       borderColor: '#00A8BE', borderStyle: 'solid', borderWidth: 2, margin: 10,  borderRadius: 35, marginLeft: -5}}>
                       <Text style={{color: '#00A8BE',
                       fontWeight: '500', letterSpacing: 1}}>MESSAGE</Text>
                       </View>
                     </TouchableOpacity>
                     </View>
                     <View style={{flex:1, flexDirection: 'row'}}>
                       <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 10,
                     borderColor: 'lightgrey', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0,marginLeft: 10}}>
                         <Text>{selectedActivityOwner.connections.length}</Text>
                         <Text style={{fontSize: 12, color: 'grey'}}>FOLLOWERS</Text>
                       </View>
                       <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 10,
                     borderColor: 'lightgrey', borderStyle: 'solid', borderWidth: 1}}>
                         <Text>{selectedActivityOwner.activities.length}</Text>
                         <Text style={{fontSize: 12, color: 'grey'}}>EVENTS</Text>
                       </View>
                       <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 10,
                     borderColor: 'lightgrey', borderStyle: 'solid', borderWidth: 1, borderRightWidth: 0, borderLeftWidth: 0, marginRight: 10}}>
                         <Text>{selectedActivityOwner.connections.length}</Text>
                         <Text style={{fontSize: 12, color: 'grey'}}>FOLLOWING</Text>
                       </View>
                     </View>
                   </View>
                   <View style={{flex: 1, flexDirection: 'row'}}>
                     <TouchableOpacity style={{flex: 1}} onPress={this.border}>
                       <View style={{flex: 1, margin: 10, marginTop: 20}}><Text style={{fontSize: 12, color: 'grey', textAlign: 'center'}}>MY EVENTS</Text></View>
                     </TouchableOpacity>
                     <TouchableOpacity style={{flex: 1}} onPress={this.border}>
                       <View style={{flex: 1, margin: 10, marginTop: 20}}><Text style={{fontSize: 12, color: 'grey', textAlign: 'center'}}>VIDEOS</Text></View>
                     </TouchableOpacity>
                     <TouchableOpacity style={{flex: 1}} onPress={this.border}>
                       <View style={{flex: 1, margin: 10, marginTop: 20}}><Text style={{fontSize: 12, color: 'grey', textAlign: 'center'}}>IMAGES</Text></View>
                     </TouchableOpacity>
                   </View>
                   <View style={{flex:1, padding: 20, marginTop:-10}}>
                     <ListView
                     dataSource = {ds.cloneWithRows(selectedActivityOwner.activities)}
                     renderRow={(rowData) =>
                       <TouchableOpacity >
                       <Image source={{uri: 'https://iso.500px.com/wp-content/uploads/2016/04/STROHL__ST_1204-Edit-1500x1000.jpg'}} resizeMode="stretch"
                       style={{width:200, height:200, marginRight: 10, justifyContent:'flex-end', alignItems:'flex-start', padding: 15}}>
                       </Image>
                       <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'left', color:'black', fontSize:15, fontWeight:'500'}}>{rowData.activityTitle}</Text>
                       </TouchableOpacity>
                     }
                     horizontal = {true}
                     showsHorizontalScrollIndicator = {false}
                     onEndReachedThreshold = {500}
                     />

                   </View>
                 </Content>
               </Container>
             </View>
           </Swiper>


           <View style={{flex: 1}}>
           <Swiper
             horizontal={false}
             loop={false}
             showsPagination={false}
             index={0}>
             <View style={{flex: 1, backgroundColor: 'transparent'}}>
                   <Image source={{uri: 'https://iso.500px.com/wp-content/uploads/2016/04/STROHL__ST_1204-Edit-1500x1000.jpg'}}
                     resizeMode = "stretch"
                     style={{flex:1, width:null, height:null, justifyContent:'center', opacity: 0.9, padding: 10}} blurRadius={1}>
                       <View style={{flex: 1, justifyContent: 'flex-end'}}>
                         <Text style={{fontSize: 50, fontWeight: '700', color: 'white', textAlign: 'left', opacity: 1,
                         textShadowOffset: {width: 1, height: 1}, textShadowRadius: 1, textShadowColor: 'black'}}>{activityObject.activityTitle}</Text>
                         <Text style={{fontSize: 20, fontWeight: '400', color: 'white', textAlign: 'left', marginTop: 10,
                       textShadowOffset: {width: 1, height: 1}, textShadowRadius: 1, textShadowColor: 'black'}}>{activityObject.activityDescription}</Text>
                       <Text style={{fontSize: 20, fontWeight: '400', color: 'white', textAlign: 'left', marginTop: 10,
                     textShadowOffset: {width: 1, height: 1}, textShadowRadius: 1, textShadowColor: 'black'}}>Location</Text>
                       </View>
                       <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
                         <Icon name="ios-arrow-up" style={{fontSize: 50, color: 'white', fontWeight: '800', textAlign: 'center',
                       textShadowOffset: {width: 1,height: 1}, textShadowRadius: 1, textShadowColor: 'black'}}/>
                         <Text style={{fontSize: 20, fontWeight: '700', color: 'white', textAlign: 'left', opacity: 1, textAlign: 'center', marginBottom: 50,
                       textShadowOffset: {width: 1,height: 1}, textShadowRadius: 1, textShadowColor: 'black'}}>Swipe Up For Details</Text>
                       </View>
                   </Image>

            </View>

             <View style={{flex: 1}}>
             <ScrollView style={{flex:1}}>

               <View style={{flex: 1, padding: 10}}>
                 <View style={{flex:1}}>
                   <Text style={{fontSize: 25, fontWeight: '700', color: '#323232', marginTop: 40}}>Activity Description</Text>
                   <Text numberOfLines={3} style={{fontSize: 15, fontWeight: '300', color: '#4E4E4E' , marginTop: 20, textAlign: 'justify'}}>{activityObject.activityDescription}</Text>
                 </View>
                 <Text style={{fontSize: 20, fontWeight: '500', color: '#323232', marginTop: 20, textAlign: 'justify'}}>General Information</Text>
                 <View style={{flex:1, flexDirection: 'row', marginTop: 20}}>
                   <View style={{flex:1, backgroundColor: '#00A699', height: 50, justifyContent: 'center', alignItems: 'center',
                   borderColor: 'transparent', borderStyle: 'solid', borderWidth: 1, borderRadius: 3, marginRight: 5}}>
                   <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>Group Size</Text>
                   <Text style={{fontSize: 14, fontWeight: '500', color: 'white'}}>{activityObject.activityCapacity}</Text>
                   </View>
                   <View style={{flex:1, backgroundColor: '#00A699', height: 50, justifyContent: 'center', alignItems: 'center',
                 borderColor: 'transparent', borderStyle: 'solid', borderWidth: 1, borderRadius: 3}}>
                   <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>Event Type</Text>
                   <Text style={{fontSize: 14, fontWeight: '500', color: 'white'}}>{activityObject.typeofRoom}</Text>
                   </View>
                 </View>

                 <View style={{flex:1, flexDirection: 'row', borderStyle: 'solid', borderColor:'grey', padding: 20,
                  borderBottomWidth: 1, borderTopWidth: 1, marginTop: 20}}>
                   <View style={{flex: 1}}>
                     <Text style={{fontSize: 15, fontWeight: '400', color: '#323232', textAlign: 'center'}}>Start Time: {activityObject.timeEnd}</Text>
                   </View>
                   <View style={{flex: 1}}>
                     <Text style={{fontSize: 15, fontWeight: '400', color: '#323232',  textAlign: 'center'}}>End Time: {activityObject.timeStart}</Text>
                   </View>
                 </View>
                 <View style={{flex:1, borderStyle: 'solid', borderColor:'grey',
                  borderBottomWidth: 1}}>
                   <Text style={{fontSize: 20, fontWeight: '500', color: '#323232', marginTop: 20, textAlign: 'justify'}}>Location</Text>
                   <Text numberOfLines={3} style={{fontSize: 15, fontWeight: '300', color: '#4E4E4E' , marginTop: 20}}>{activityObject.activityLocation}</Text>
                   <MapView
                     style={{height: 200, width: 350, marginTop: 20, marginBottom: 20}}
                     initialRegion={{
                       latitude: 37.78825,
                       longitude: -122.4324,
                       latitudeDelta: 0.0922,
                       longitudeDelta: 0.0421,
                     }}
                   />
                 </View>

                 <View style={{flex:1, marginTop: 20}}>
                   <View style={{flex:1, backgroundColor: 'white', height: 100, justifyContent: 'center'}}>
                   <Text style={{fontSize: 20, fontWeight: '500', color: '#323232', marginTop: 20}}>Notes</Text>
                   <Text numberOfLines={3} style={{fontSize: 15, fontWeight: '300', color: '#323232' , marginTop: 20,textAlign: 'justify'}}>We invite only athletes with experience
                    running 3 miles of more averaging an 8 minute mile pace.</Text>
                   </View>
               </View>
               </View>
             </ScrollView>
             </View>
             </Swiper>

           </View>
         </Swiper>
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
       userActions: bindActionCreators(loginCreators, dispatch)
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailEvent);
