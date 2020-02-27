/* eslint-disable react/self-closing-comp */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { StyleSheet, Button, Text } from 'react-native'
import { getContacts } from '../GetContacts/GetContacts'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import ListView from './listView';
import CallTracker from '../CallTracker';

export default class OnBoarding extends Component {

  constructor(props) {
    super(props);
    this.state = { contacts: null };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'On Boarding Screen',
    };
  };
  callback = (list) => {
    this.setState({ contacts: list })
  }
  get = () => {
    getContacts(this.callback);
  }
  render() {
    const { contacts } = this.state
    return (
      <>
        <ScrollView>
          {!!contacts && contacts.length > 0 && <ListView contact={contacts} />}
        </ScrollView>
        <Button
          style={{ fontSize: 20, color: 'green', width: 20, flex: 1 }}
          styleDisabled={{ color: 'red' }}
          title="Get contacts"
          onPress={this.get}>
        </Button>
        <Button
          style={{ fontSize: 20, color: 'green', width: 20, flex: 1 }}
          styleDisabled={{ color: 'red' }}
          title="Block"
          onPress={() => this._handlePress()}>
        </Button>
        <CallTracker />
      </>
    )
  }
}

const styles = StyleSheet.create({
  propertyName: {
    fontSize: 32,
    bottom: 0,
    color: 'white'
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'flex-end'
  },
  description: {
    fontSize: 20,
    color: 'white'
  }
})