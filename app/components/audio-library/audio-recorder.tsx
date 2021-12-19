import { v4 as UUID } from "uuid"
import React, { useState, useEffect } from "react"
import { View, Modal, TextInput, FlatList, ViewStyle, Text, Alert, TextStyle } from "react-native"
import { color } from "../../theme"

import { Button, TextField } from '../../components'

import RNFS from 'react-native-fs'
import SoundRecorder from 'react-native-sound-recorder';
import { requestExternalStorage, requestMicrophonePermission } from "./permissions";

import Icon from 'react-native-vector-icons/FontAwesome';



const HORIZONTAL_SPACING = {
    top: 35,
    marginLeft: 15,
    marginRight: 15,
    width: 32
}
const buttonSize = 30

const SAVED_AUDIO_PATH = `${RNFS.DocumentDirectoryPath}/soundfave/`

const MODAL_CONTAINER: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    backfaceVisibility: "visible"
}

const MODAL_MAIN: ViewStyle = {
    
}

const VIEW_STYLE = {
    paddingTop: 50,
    padding: 15,
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

const AudioRecorder = function AudioRecorder(props: RecorderProps) {

    const [title, setTitle] = useState("")
    const [recordingStatus, setRecordingStatus] = useState<number>(0)
    const [uuid] = useState<string>(UUID())
    const [path, setPath] = useState<string | undefined>()


    useEffect(() => {
        RNFS.mkdir(SAVED_AUDIO_PATH)
            // .then( (...args: any[]) => console.log('Created path', SAVED_AUDIO_PATH) )
            .catch(err => {
                console.warn('There was a problem preparing the saved audio path: ' + SAVED_AUDIO_PATH, err)
                Alert.alert('There was a problem preparing the saved audio path: ' + SAVED_AUDIO_PATH)
                props.closeModal()
            })
    })




    const toggleRecording = async () => {
        const filename = uuid + '.mp4'
        if (recordingStatus === 0) {
            try {
                setRecordingStatus(1)
                await requestMicrophonePermission()
                await requestExternalStorage()
                await SoundRecorder.start(SoundRecorder.PATH_CACHE + '/' + filename)
                setRecordingStatus(2)
                console.log('started recording');
            } catch (err) {
                setRecordingStatus(0)
                console.warn('Failed to start recording', err)
            }
        } else if (recordingStatus === 1) {
            console.log('already trying to start...')
        } else if (recordingStatus === 2) {
            try{ 
                setRecordingStatus(3)
                const result = await SoundRecorder.stop()

                console.log('stopped recording, audio file saved at: ' + result.path);
                console.log('Trying to move to', `${SAVED_AUDIO_PATH}${filename}`)
                // /storage/self/primary/Download
                const copied = RNFS.copyFile(result.path, `${SAVED_AUDIO_PATH}${filename}`)
                setRecordingStatus(0)
                const path = `${SAVED_AUDIO_PATH}${filename}`
                console.log('file uploaded!', path, copied)
                setPath(path)
            }catch(err) {
                setRecordingStatus(0)
                console.warn('Failed to stop recording!', err)
            }
        }
    }



    const recordingStatusMessages = []
    recordingStatusMessages[0] = 'R'
    recordingStatusMessages[1] = 'I'
    recordingStatusMessages[2] = 'S'
    recordingStatusMessages[3] = 'V'

    const recordingStatusStyle: ViewStyle[] = []
    recordingStatusStyle[0] = { backgroundColor: 'white' }
    recordingStatusStyle[1] = { backgroundColor: 'gray'}
    recordingStatusStyle[2] = { backgroundColor: 'green'}
    recordingStatusStyle[3] = { backgroundColor: 'red' }

    const icons = []
    icons[0] = "microphone"
    icons[1] = "spinner"
    icons[2] = "stop"
    icons[3] = "spinner"


    const onSave = async () => {
        await props.closeModal({ id: uuid, path, title })
    }

    const onCancel = async () => {
        if( path ){
            try {
                console.log('cleaning up unsaved file', path)
                await RNFS.unlink(path)
            }catch(err){
                console.warn('Failed to delete previous recording', { path }, err)
            }finally {
                setPath(undefined)
            }
        }
        props.closeModal()
    }

    return (
        <View style={MODAL_CONTAINER}>
            <Modal
                style={MODAL_MAIN}
                presentationStyle="pageSheet"
                animationType="fade"
                visible={true}
            >
                <View style={VIEW_STYLE}>
                    <View style={{ display: 'flex', flexDirection: "row" }}>
                        <Icon name={ icons[recordingStatus] } size={buttonSize} style={ HORIZONTAL_SPACING } color={ "#fff" } onPress={toggleRecording} />
                        <TextInput
                            style={{ ...FORM_FIELD, flex: 1, marginBottom: 15, color: 'white' }}
                            placeholder="What sound are you recording?"
                            autoCapitalize="none"
                            returnKeyType="next"
                            onChangeText={setTitle}
                            value={title}
                        />
                        <Icon name="undo" size={buttonSize} style={ { ...HORIZONTAL_SPACING } } color={ "#fff" } onPress={onCancel} />
                        <Icon name="save" size={buttonSize} style={ { ...HORIZONTAL_SPACING } } color={ "#fff" } onPress={onSave} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AudioRecorder