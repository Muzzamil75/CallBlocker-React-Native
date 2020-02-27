/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLoggedIn: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('App');
    }, 2000);
  }
  render() {
    return (
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['rgb(24,155,198)', 'rgb(38,189,239)']}
        style={styles.container}>

        <Image
          source={require('../../../assets/logo.png')}
          style={styles.icon}
        />
        <Text style={styles.welcomeText}>Splash screen</Text>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  welcomeText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 34,
  },
  icon: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    resizeMode: 'cover'
  }
});
