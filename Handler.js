/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import CallDetectorManager from 'react-native-call-detection'
import { NativeModules } from 'react-native';


module.exports = async (taskData) => {
  console.log("RUNNNINGG0-------------------------------------");
  NativeModules.CallHandler.endCall();

  const callDetector = new CallDetectorManager((event, number) => {
    if (event === 'Incoming') {
      NativeModules.CallHandler.show('Haris is blocked ', 500);
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
};

