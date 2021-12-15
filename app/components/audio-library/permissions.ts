import { Permission, PermissionsAndroid } from 'react-native'

export function requestPermission(permission: Permission, title: string, message: string ) {
  return PermissionsAndroid.request(permission, {title, message, 
    buttonNegative: 'Reject',
    buttonPositive: 'Allow',
  }).then(granted => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(`Permission [${permission}] granted`)
    } else {
      throw new Error(`Permission [${permission}] not granted: ${granted}`)
    }
  }).catch(err => {
    console.warn(`Permission [${permission}] not granted: ${err.message}`)
  })
}

export const requestMicrophonePermission = () => requestPermission(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, 'Enable Microphone', 'This app needs access to your microphone to record prompts.')
export const requestExternalStorage = () => requestPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, 'Enable Storage', 'This app needs access to your external storage to store audio files')
