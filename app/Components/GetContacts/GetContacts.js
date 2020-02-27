/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { PermissionsAndroid, Alert, Platform } from 'react-native';
import Contacts from 'react-native-contacts';

export const requestContactsPermission = async () => {
  if (Platform.OS === 'ios') {
    return true;
  }
  // else
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'PopUp-AutoMessenger',
        message:
          'Select a contact to block '
        ,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert('Oops', "You've denied the permissions request.");
      return false;
    }
  } catch (err) {
    Alert.alert('Oops', 'Unable to request for permissions.');
  }
};

export const getContacts = async (callback) => {
  if (await requestContactsPermission()) {
    Contacts.getAllWithoutPhotos((err, contacts) => {
      if (err === 'denied') {
        Alert.alert('Oops', 'You didn"t granted permission to read contacts');
      } else {
        return callback(contacts);
      }
    });
  }
};


