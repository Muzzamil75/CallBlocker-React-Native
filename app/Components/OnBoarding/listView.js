/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import CallTracker from '../CallTracker';

export default class ListView extends Component {
  render() {
    const { contact } = this.props;
    console.log('asdads', contact[32].givenName)
    return (
      <>
        <Text>testing {contact[26].givenName}</Text>
        {contact.map((person, key) => {
          return (
            <View style={styles.contactNameCol}>
              <Text style={styles.contactName}>
                {person.givenName + ' ass' + (person.familyName || '')}
              </Text>
              <Text>
                {person.phoneNumbers[0] && person.phoneNumbers[0].number}
              </Text>
            </View>
          )
        })}
        <CallTracker />
      </>
    )
  }
}

const styles = StyleSheet.create({
  contactName: {
    // fontFamily: FONTS.primaryBold,
    fontSize: 18,
    letterSpacing: 1.1,
  },
  contactNameCol: {
    marginLeft: 20,
  },
})