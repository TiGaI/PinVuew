import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View } from 'react-native';

import Modal from 'react-native-modalbox';

import { Button, List, SocialIcon, Icon} from 'react-native-elements'
import { Container, Content, Card, CardItem, Text, Body, Spinner, Radio, ListItem} from 'native-base';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/goalandnotificationAction';
import { connect } from 'react-redux';
import Slider from 'react-native-slider'
import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;

class Goals extends Component{
  constructor(props){
    super(props);
    if(this.props.profile.userObject){
      this.props.actions.getMyGoals(this.props.profile.userObject._id);
    }
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      value: 1,
      selectedItem : 2,
      editGoalID: ' ',
      itemList: ['Studing', 'Hobbies', 'Sleeping']
    };
  }
  onPikcerSelect(index){
     this.setState({
       selectedItem: index,
     })
   }
  submitGoalForm(){
    let goalObject = {
     userID: this.props.profile.userObject._id,
     activityCategory: this.state.itemList[this.state.selectedItem],
     activityGoal: this.state.value,
     goalTimeFrame: 1
    }
    if(this.state.editGoalID === ' '){
      this.props.actions.createGoal(goalObject, this.props.goal.myGoals)
    }else{
      this.props.actions.editGoal(this.state.editGoalID, goalObject, this.props.goal.myGoals)
    }

    this.setState({
      isOpen: false,
      editGoalID: ' '
    });
  }
  editGoalForm(){
    let goalObject = {
     userID: this.props.profile.userObject._id,
     activityCategory: this.state.itemList[this.state.selectedItem],
     activityGoal: this.state.value,
     goalTimeFrame: 1
    }
    console.log(goalObject);
    this.props.actions.editGoal(goalObject, this.props.goal.myGoals)
    this.setState({
      isOpen: false
    });
  }
  editGoal(goal){
    var index = this.state.itemList.indexOf(goal.activityCategory)
      this.setState({
          value: goal.activityGoal,
          selectedItem: index,
          editGoalID: goal._id,
          isOpen: true
      })
  }
  deleteGoal(goalID){
    this.props.actions.deleteGoal(goalID, this.props.goal.myGoals)
  }
  render() {
    var goalObject = this.props.goal.myGoals
    if(goalObject){

      var goals = goalObject.map((x) => {
         return (
            <ListItem>

                <Text>Daily Goal: {x.activityCategory} for {x.activityGoal} hrs</Text>

              <View  style={{flex: 1, flexDirection:'row', justifyContent:'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end'}} >

                <Icon
                name='mode-edit'
                onPress={this.editGoal.bind(this, x)}
                />

                <Icon
                  name='delete'
                  onPress={this.deleteGoal.bind(this, x._id)}
                  />
                  <Radio selected={true} />
              </View>




            </ListItem>
      )})
    }

    var BContent = <Button large onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]} title='X' />;

    if(this.props.login.skip){
      var checkforlogin = (
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

      )
    }else{
      var checkforlogin = <Spinner color='green'/>
    }
    return(

      <View style={{flex: 1}}>
      { this.props.profile.userObject ?  (
        <View style={{flex: 1}}>
          <Button
            large
            iconLeft
            icon={{name: 'add'}}
            backgroundColor={'#20C48A'}
            onPress={()=> this.setState({isOpen: true})}
            title='Add New Goal' />



                 <View style={{flex: 1, flexDirection: 'row'}}>
                   {this.props.goal.myGoals.length > 0 ?
                      (
                        <Container>
                            <Content>
                                  {goals}
                            </Content>
                        </Container>

                      ) : (
                          <View style={{flex: 0}}>
                            <Text>
                              You Have No Goals Currently.
                            </Text>
                         </View>
                      )
                    }
                  </View>

                  <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})} style={[styles.modal, styles.modal4]} position={"top"} backdropContent={BContent}>

                          <View style={styles.containerTop}>
                              <Text>
                                Pick the category you want to improve!
                              </Text>
                              <Picker style={{width: 150, height: 120}}
                                selectedValue={this.state.selectedItem}
                                itemStyle={{color:"white", fontSize:14}}
                                onValueChange={(index) => this.onPikcerSelect(index)}>
                                  {this.state.itemList.map((value, i) => (
                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                  ))}
                              </Picker>
                            </View>


                              <View style={styles.container}>
                              <View style={styles.titleContainer}>
                                <Text style={styles.caption} numberOfLines={1}>How much hours is your goal?</Text>
                              </View>
                                  <Slider
                                    value={this.state.value}
                                    minimumTrackTintColor='#1fb28a'
                                     maximumTrackTintColor='#d3d3d3'
                                     thumbTintColor='#1a9274'
                                     minimumValue={1}
                                      maximumValue={8}
                                      step={.5}
                                      trackStyle={customStyles2.track}
                                      thumbStyle={customStyles2.thumb}
                                    onValueChange={(value) => this.setState({value})} />

                                    <Text style={styles.value, {textAlign: 'center'}} numberOfLines={1}>{this.state.value}</Text>
                              </View>
                              
                              <Button
                                large
                                backgroundColor={'#20C48A'}
                                onPress={this.submitGoalForm.bind(this)}
                                title='Submit Goal' />
                  </Modal>
          </View>
        ) : (
          checkforlogin
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  modal4: {
    height: 350,
    backgroundColor: "#3B5998"
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  text: {
    color: "black",
    fontSize: 22
  },
  containerTop: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caption: {
    //flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
  }

});

var customStyles2 = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '#30a935',
    borderWidth: 2,
    top: 22
  }
});

function mapStateToProps(state) {
	return {
    profile: state.get('profile'),
    goal: state.get('goal'),
    login: state.get('login')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals);
