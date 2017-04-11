import React, { Component, PropTypes } from 'react';
import { AppRegistry, ScrollView, StyleSheet,
  Text, View, TextInput, TouchableOpacity, NavigatorIOS,
  ListView, Alert, AsyncStorage, TouchableHighlight, ImagePickerIOS, Image } from 'react-native';
  import { Container, Content, Left, Body, Header, Right, ListItem, Thumbnail, Card, Title, CardItem, Item, Input, Label,  Button} from 'native-base';
  import { connect } from 'react-redux';
  import Swiper from 'react-native-swiper';
  import { bindActionCreators } from 'redux';
  import randomcolor from 'randomcolor';
  import * as actionCreators from '../actions/initialAction';
  import * as loginAction from '../actions/loginAction';
  import Icon from 'react-native-vector-icons/Ionicons';

  var t = require('tcomb-form-native');
  var Form = t.form.Form;

  const nameofthecategory = t.enums.of([
    'Baseball',
    'Basketball',
    'Beach Volleyball',
    'Hiking',
    'Running',
    'Soccer',
    'Tennis'

  ], 'nameofthecategory');

  const numberofhours = t.enums.of([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'

  ], 'numberofhours');



  var capacity = t.refinement(t.Number, function (n) { return n > 0; });

  capacity.getValidationErrorMessage = function (value, path, context) {
    return 'capacity cannot be less than zero: ' + context.locale;
  };

  var Activity = t.struct({
    activityTitle: t.String,
    activityDescription: t.String,
    activityCategory: nameofthecategory,
    activityCapacity: t.Number,
    activityStartTime: t.Date,
    activityDuration: numberofhours
  });

  var options = {
    fields: {
      timeStart: {
        mode: 'time'
      },
      activityTitle: {
        label: 'Title',
        placeholder: 'Activity Title',
        error: 'Title Required'
      },
      activityDescription: {
        label: 'Description',
        placeholder: 'Activity Description',
        error: 'Description Required'
      },
      activityCategory: {
        label: 'Select Category',
        placeholder: 'Select a category',
        error: 'Category Required'
      },
      activityCapacity: {
        label: 'Capacity',
        placeholder: 'Activity Capacity',
        error: 'Capacity Required or Must be a number'
      },
      activityStartTime: {
        label: 'Select Start Time',
        placeholder: 'Select a category',
        error: 'Start Time Required'
      },
      activityDuration: {
        label: 'Activity Duration',
        placeholder: 'Select a category',
        error: 'Duration Required'
      }
    }
  };


  var PinForm = React.createClass({

    getInitialState() {
      console.log('PROPS TEST', this.props)
      return {
        value: {
          activityTitle: "",
          activityDescription: "",
          activityCategory: ""
        },
        position: {
          latitude: this.props.latitude,
          longitude: this.props.longitude
        },
        photoData: null
      };
    },

    submitForm(){
    },


    pickImage() {
      // openSelectDialog(config, successCallback, errorCallback);
      var date = Date.now();
      var imgTitle =  this.props.profile.userObject.email + date + '.jpg';
      ImagePickerIOS.openSelectDialog({},
        resp => {
          var formData = new FormData();
          formData.append('file', {
            uri: resp,
            type: 'image/jpeg',
            name:  imgTitle
          });
          this.setState({photoData: formData});
          //    fetch('http://localhost:8080/postToS3', {
          //      method: 'POST',
          //      headers: {
          //        'Content-Type': 'multipart/form-data'
          //      },
          //      body: formData
          //    })
          //    .then(resp => resp.json())
          //    .then(resp => {
          //      console.log('success upload', resp);
          //      photo = resp.file.location;
          //    })
          //    .catch(resp => console.log('err upload', resp));
        },
        resp => console.log('err', resp));
        // console.log("IMAGE PICKER IOS", ImagePickerIOS.openSelectDialog)

      },

      onChange(value) {
        this.setState({ value });
      },

      onPress: function (){
        // var self = this
        // console.log("PHotoData", self.state.photoData)
        // var s3 = function(self){
        //   console.log("IN S3")
        //   return fetch('http://localhost:8080/postToS3', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'multipart/form-data'
        //       },
        //       body: photo
        //     })
        //     .then(resp => resp.json())
        //     .then(resp => {
        //       console.log('success upload', resp.file.location);
        //       copy["activityImages"] = [resp.file.location];
        //       return copy;
        //     })
        // }
        // var createActivity = function() {
        //   console.log("CreactActivity", copy)
        //   return fetch("http://localhost:8080/createActivity", {
        //     method: 'POST',
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //       activity: copy
        //     })
        //   })
        // }
        // var doMyShit = function(photoAdded){
        //   console.log("IS PHOTO ADDED", photoAdded)
        //   if (photoAdded){
        //     return s3(self).then(createActivity).catch((resp => console.log('err upload', resp)));
        //   } else {
        //     return createActivity().catch((resp => console.log('err upload', resp)));
        //   }
        // }
        var value = this.refs.form.getValue();
        if (value) {
          var activityObject = Object.assign({}, value);
          activityObject.activityLatitude = this.props.latitude;
          activityObject.activityLongitude = this.props.longitude;
          activityObject.activityCreator = this.props.profile.userObject._id;


        this.props.actions.createActivity(activityObject)

        }
        //   fetch('http://localhost:8080/postToS3', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     },
        //     body: photoData
        //   })
        //   .then(resp => resp.json())
        //   .then(resp => {
        //     console.log('success upload', resp);
        //     copy["activityImages"] = [resp.file.location];
        //   }).then(() => {
        //     fetch("http://localhost:8080/createActivity", {
        //       method: 'POST',
        //       headers: {
        //         "Content-Type": "application/json"
        //       },
        //       body:
        //       JSON.stringify({
        //         activity: copy
        //       })
        //     })
        //     photoData = null;
        //   }).catch(resp => console.log('err upload', resp));
        // }
        // this.setState({photo: ["defaultimage.jpg"]});
      },

      render() {
        const { profile } = this.props;
        return(
          <View style={styles.container}>
          <Text style={{fontSize: 25, fontWeight: '700', color: '#323232', margin: 20, textAlign: 'center'}}>Pin a location </Text>
          <ScrollView keyboardShouldPersistTaps="always" style={{paddingLeft:10,paddingRight:10, height:500}}>
          <Form
          ref="form"
          type={Activity}
          options={options}
          value={this.state.value}
          onChange ={this.onChange.bind(this)}
          />
          <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity style={{flex: 1, backgroundColor: 'white' ,borderWidth: 2, borderColor: 'grey', height: 70, borderRightWidth: 0}} onPress={this.pickImage}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon style={{fontSize: 35, color: 'grey'}} name='md-camera'/>
          <Text style={{color: 'grey'}}>Upload Photo</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, backgroundColor: 'white' ,borderWidth: 2, borderColor: 'grey', height: 70}} onPress={this.onPress}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon style={{fontSize: 35, color: 'grey'}} name='md-checkmark-circle'/>
          <Text style={{color: 'grey'}}>Submit</Text>
          </View>
          </TouchableOpacity>
          </View>

          </ScrollView>

          </View>

        )
      }

    })

    var styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        marginTop: 20,
        padding: 20,
        backgroundColor: '#ffffff',
      },
      title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
      }

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
        actions: bindActionCreators(actionCreators, dispatch)
      };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(PinForm);
