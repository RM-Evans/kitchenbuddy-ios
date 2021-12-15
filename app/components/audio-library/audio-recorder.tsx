import { v4 as UUID } from "uuid"
import React, { useState, PermissionsAndroid, useEffect }  from "react"
import { View, Modal, TextInput, FlatList, ViewStyle, Text, Alert, TextStyle} from "react-native"
import { color } from "../../theme"

import { Button, TextField } from '../../components'

import RNFS from 'react-native-fs'
import SoundRecorder from 'react-native-sound-recorder';
import { requestExternalStorage, requestMicrophonePermission } from "./permissions";



const SAVED_AUDIO_PATH = `${RNFS.DownloadDirectoryPath}/soundfave/`

const MODAL_CONTAINER: ViewStyle = {
    flex: 1,
    justifyContent: "center",
}

const MODAL_MAIN: ViewStyle = {}

const VIEW_STYLE = {
paddingTop: 50,
backgroundColor: color.palette.skyBlue,
}


const FORMTEXT: TextStyle = { fontSize: 20, paddingLeft: 10 }
const FORM_FIELD: ViewStyle = {
  ...FORMTEXT,
  height: 45,

  // borderWidth:1,

  borderBottomWidth: 2,

  // borderRadius: 15,

  borderColor: color.palette.darkBlue,
  marginTop: 30,
}

interface RecorderProps {
    closeModal: (item?: any) => unknown
}
  
const AudioRecorder = function AudioRecorder(props: RecorderProps){

    const [title, setTitle] = useState("")
    const [recordingStatus, setRecordingStatus] = useState<number>(0)
    const [uuid] = useState<string>(UUID())
    const [path, setPath] = useState<string | undefined>()


    useEffect( () => {
        RNFS.mkdir(SAVED_AUDIO_PATH)
            // .then( (...args: any[]) => console.log('Created path', SAVED_AUDIO_PATH) )
            .catch(err => {
                console.warn('There was a problem preparing the saved audio path: ' + SAVED_AUDIO_PATH, err)
                Alert.alert('There was a problem preparing the saved audio path: ' + SAVED_AUDIO_PATH)
                props.closeModal()
            })
    })
    
    


    const toggleRecording = () => {
        const filename = uuid + '.mp4'
        if( recordingStatus === 0 ){
          setRecordingStatus(1)
          requestMicrophonePermission()
            .then(requestExternalStorage)
            .then(() => SoundRecorder.start(SoundRecorder.PATH_CACHE + '/' + filename))
            .then(function() {
              setRecordingStatus(2)
              console.log('started recording');
            }).catch(err => {
              setRecordingStatus(0)
              console.warn('Failed to start recording', err)
            });  
        }else if( recordingStatus === 1 ){
          console.log('already trying to start...')
        }else if( recordingStatus === 2){
          setRecordingStatus(3)
          SoundRecorder.stop()
            .then(function(result) {
                console.log('stopped recording, audio file saved at: ' + result.path);
                console.log('Trying to move to', `${SAVED_AUDIO_PATH}${filename}`)
                // /storage/self/primary/Download
                return RNFS.copyFile(result.path, `${SAVED_AUDIO_PATH}${filename}`)
            })
            .then(function(result) {
              setRecordingStatus(0)
              const path = `${SAVED_AUDIO_PATH}${filename}`
              console.log('file uploaded!', path, result)
              setPath(path)
            }).catch(err => {
              setRecordingStatus(0)
              console.warn('Failed to stop recording!', err)
            });
        }
      }



    const recordingStatusMessages = []
    recordingStatusMessages[0] = 'Start Recording?'
    recordingStatusMessages[1] = 'Initializing recorder....'
    recordingStatusMessages[2] = 'Recording!'
    recordingStatusMessages[3] = 'Saving...'


    const onSave = async () => {
        console.log({ title, path })
    }
    
    return (
        <View style={MODAL_CONTAINER}>
            <Modal
                style={MODAL_MAIN}
                animationType="slide"
                transparent={true}
                visible={true}
                >
                <View style={VIEW_STYLE}>
                    <View style={{ display: 'flex', flexDirection: "row"}}>
                    <Button onPress={toggleRecording} text={recordingStatusMessages[recordingStatus] || ('Unknown status: ' + recordingStatus)}/>
                        <TextInput
                            style={{ ...FORM_FIELD, flex: 1 }}
                            placeholder="What sound are you recording?"
                            autoCapitalize="none"
                            returnKeyType="next"
                            onChangeText={setTitle}
                            value={title}
                            // onSubmitEditing={() => { this.loginPassword.focus(); }}
                            // https://stackoverflow.com/questions/32748718/react-native-how-to-select-the-next-textinput-after-pressing-the-next-keyboar
                            //
                            // blurOnSubmit={false}
                        />
                    </View>
                    <View style={{ display: 'flex', flexDirection: "row"}}>
                        <Button style={{flex: 1}} onPress={props.closeModal} text="Cancel" />
                        <Button style={{flex: 1}} onPress={onSave} text="Save" />
                    </View>
                </View>
            </Modal>
        </View>
        )
}

export default AudioRecorder