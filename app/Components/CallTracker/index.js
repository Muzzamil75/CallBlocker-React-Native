/* eslint-disable no-undef-init */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, { Component } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import { NativeModules } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import CallDetectorManager from 'react-native-call-detection'
import { check, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import BackgroundJob from 'react-native-background-job';

const BLOCKED = [
  {
    name: 'Hamza',
    number: '03056007001',
  },
  {
    name: 'Haris',
    number: '03236667049',
  },
]

const backgroundJob = {
  jobKey: "myJob",
  job: () => console.log("Running in background")
};

BackgroundJob.register(backgroundJob);
export default class CallTracker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blockedContacts: BLOCKED,
    }
  }

  componentDidMount() {
    this.startListenerTapped();
    this.getPermissions();
  }

  getPermissions = async () => {
    check(PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            openSettings()
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log('errror in geting permisison', error)
      });
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        ],
        {
          title: 'PopUp-AutoMessenger',
          message:
            'Are u sure'
          ,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      Alert.alert('Oops', 'Unable to request for permissions.');
    }
  }

  getBlocknumbers = victimNo => {
    const { blockedContacts } = this.state;
    return blockedContacts.some(n => n.number == victimNo)
  }

  startListenerTapped = async () => {
    this.callDetector = new CallDetectorManager((event, number) => {
      console.log('number', number)
      if (event === 'Incoming') {
        if (this.getBlocknumbers(number)) {
          // NativeModules.CallHandler.endCall();
          console.log('haris i s callinghjghj', number)
          NativeModules.CallHandler.show('Haris is blocked ', 500);
        }
      }
      else if (event === 'Offhook') {
        console.log('numnber', number)
      }
    },
      true,
      (e) => { console.log('test', e) },
      {
        title: 'Phone State Permission',
        message: 'This appp needs access to your phone state in order to react and/or to adapt to incoming calls.'
      }
    )
  }

  // callFriendTapped() {
  //   Linking.openURL('tel:03244140470')
  //     .catch(err => {
  //       console.log(err)
  //     });
  // };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.startListenerTapped}
          title="Start Listener"
          color="#841584"
          style={styles.bottomMargin}
        />
        <Button
          onPress={this.callFriendTapped}
          title="Call your friend"
          color="#341584"
          style={styles.bottomMargin}
        />
        <Text style={styles.text}>
          Call State Logs
         </Text>
        {<Text>{this.state.ds}</Text>}
        {/* <ListView
          dataSource={this.state.ds}
          renderRow={(rowData) => <Text style={styles.callLogs}>{rowData}</Text>}
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottomMargin: {
    marginBottom: 10
  },
  text: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    color: '#341584'
  },
  callLogs: {
    textAlign: 'center',
    fontSize: 15,
    color: '#333333',
    marginBottom: 5
  }
})