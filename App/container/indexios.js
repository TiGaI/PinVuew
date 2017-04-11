import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/loginAction';
import Tabs from '../components/tabs';
import Login from '../components/login'

const styles = StyleSheet.create({
  wrapper: {
      marginTop: 20,
      flex: 1
  },
  text: {
      fontSize: 20,
      color: '#01579B'
  }
})

class AlphaVuew extends Component {
  render() {
        const { actions, login, profile } = this.props;
        let tabsComponent = <Tabs onPress={() => actions.logout()} profile={profile} />;
        let loginComponent = <Login facebook={() => actions.login()} onSkip={() => actions.skip()} />;

        if(login.error) {
            loginComponent = <View><Login onPress={() => actions.login()} /><Text style={styles.text}>{login.error}</Text></View>;
        }

        if(login.loading) {
          loginComponent = <ActivityIndicator size="large" color="#3b5998" />;
          profileComponent = <ActivityIndicator size="large" color="#3b5998" />;
        }

        return (
            <View style={styles.wrapper}>
            { login.loggedIn || login.skip ? tabsComponent : loginComponent }
            </View>
        );
  }
}

AlphaVuew.propTypes = {
    login: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        login: state.get('login'),
        profile: state.get('profile')

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlphaVuew);
