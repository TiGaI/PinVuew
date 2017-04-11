import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';
import { Button, SocialIcon } from 'react-native-elements'

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.container}>
      <Button
        large
        raisesd
        onPress={this.props.onSkip}
        borderRadius={32}
        title='      Skip It      ' />
      </View>

        <View style={styles.socialContainer}>

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
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#141515'
  },
  socialContainer:{
    flex: 1,
    flexDirection: 'row',

  }
})

Login.propTypes = {
    facebook: PropTypes.func.isRequired,
    onSkip: PropTypes.func.isRequired
};

export default Login;
