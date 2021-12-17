import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { View, Text, FlatList, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { range } from "ramda"
import { color, typography } from "../../theme"
import RNFS from 'react-native-fs';

import {
    Checkbox,
    Button,
    Header,
    Screen,
    // Text,
    Wallpaper,
    AutoImage as Image,
    PlaySoundTest,
  } from "../../components"

import AudioRecorder from './audio-recorder'
import { string } from "mobx-state-tree/dist/internal"
import { ResolvableSound } from "../sound-player/sound-library-sounds"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
//   paddingHorizontal: spacing[4],
}
const BOLD: TextStyle = { fontWeight: "bold" }
const PRIMARYTEXTCOLOR: TextStyle = { color: color.palette.darkBlue }
const TEXT: TextStyle = {
  ...PRIMARYTEXTCOLOR,
  fontFamily: typography.primary,
}


const FLATLIST_ITEM: ViewStyle = {
flexDirection: "row",
paddingVertical: 30,
}

const FLATLIST_ITEM_DIFFICULTY: TextStyle = {
    ...TEXT,
    paddingLeft: 20,
}

const FLATLIST_ITEM_TITLE: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 18,
    paddingLeft: 45,
}

const FLATLIST_SEPARATOR: ViewStyle = {
    height: 1,
    backgroundColor: color.palette.darkBlue,
}
  


type ControlButtons = {
    add?: boolean,
    select?: boolean
    delete?: boolean
}

type ListItemProps = { 
    selected?: boolean,
    controls?: ControlButtons
    row: { item: any }, 
    onDelete: Function,
    onSelected: (newValue: boolean) => void,
}

const ListItem = observer(function ListItem({ selected, controls, row: { item: sound }, onDelete, onSelected }: ListItemProps) {

    const [ status, setStatus ] = useState(0)
    const [ audio, setAudio ] = useState<ResolvableSound | undefined>()


    const ctrl = {
        add: true,
        select: false,
        delete: false,
        ...(controls || {})
    }


    const togglePlaying = async () => { 
        let theAudio = audio
        if( !audio ){
            console.log('loading sound', sound.path)
            const file = new ResolvableSound(sound.path, null)
            await file.loadSound()
            setAudio(file)
            theAudio = file
        }
        if (status === 0) {
            setStatus(1)
            try { 
                await theAudio.play()
                console.log('played!')
                setStatus(0)
            }catch(err){
                console.warn('failed', err)
                setStatus(2)
            }finally {
                // setStatus(0)
            }
        }
        if( status === 2){
            setStatus(0)
        }
    }

    const messages = []
    messages[0] = "Play"
    messages[1] = "Stop"
    messages[2] = "ERROR"
    
    return (
    <TouchableOpacity>
      <View style={FLATLIST_ITEM}>
        { ctrl.select ? <Checkbox style={{ marginLeft: 10, marginRight: 10}} value={ selected } onToggle={ onSelected } /> : null }
        <Button style={FLATLIST_ITEM_DIFFICULTY} text={messages[status]} onPress={togglePlaying} />
        { ctrl.delete ? <Button style={FLATLIST_ITEM_DIFFICULTY} text="Delete" onPress={() => onDelete(sound)} /> : null }
        <Text style={FLATLIST_ITEM_TITLE}>{sound.title || '<No Title>'}</Text>
        {/* <Text> {sound.path}</Text> */}
        {/* <Text> {selected ? 'yes' : 'no'}</Text> */}
      </View>
    </TouchableOpacity>
  )
})
const flatlistSeparator = () => {
    return <View style={FLATLIST_SEPARATOR} />
}


type AudioLibraryProps = {
    controls?: ControlButtons,
    onSelected?: (selected?: any) => void,
}
const AudioLibrary = observer(function AudioLibrary(props: AudioLibraryProps) {

    const { audioStore } = useStores()
    const [modalVisible, setModalVisible] = useState(false)
    const [status, setStatus] = useState(0)

    // const [sounds, setSounds] = useState(audioStore.sounds)


    const addSound = () => {
        console.log('add?')
        setModalVisible(true)
    }

    const recorderComplete = async (item?: { id: string, path: string, title: string }) => {
        setModalVisible(false)
        if( item ){
            setStatus(1)
            try { 
                const created = await audioStore.createSound(item.id, item.title, item.path)
                console.log('created!', created)
            } catch (err) { 
                console.warn('failed creating!', err)
            }finally {
                setStatus(0)
            }
        }
    }

    const onDelete = async (sound) => { 
        let storeDeleted: boolean | undefined
        let fsDeleted: boolean | undefined

        try {
            storeDeleted = await audioStore.deleteSound(sound.id)
            await RNFS.unlink(sound.path)
            fsDeleted = true
            console.log('Deleted sound', sound.path)
        }catch(err){
            fsDeleted = false
            console.warn('deleting failed', sound, err)
        }finally {
            console.log('deleting', sound, { storeDeleted, fsDeleted })
        }
    }


    const [ selected, setSelected ] = useState<undefined | string>()
    const onSelected = (sound: any, newState: boolean) => {
        if( selected === sound.id ){
            setSelected(undefined)
            props.onSelected && props.onSelected(undefined)
        }else if(newState ){
            setSelected(sound.id)
            props.onSelected && props.onSelected(sound)
        }else{
            console.log('do i do somehting?')
        }
    }
    
    return (
        <View testID="AudioLibrary">

            <View style={FLATLIST_ITEM}>
                <Text style={FLATLIST_ITEM_TITLE}>Audio Library</Text>
                <Button onPress={addSound} text="+"/>
                <Text>Visible? { modalVisible ? 'yes' : 'no' }</Text>
                { status === 1 && <Text>Saving...</Text> }
            </View>
            <FlatList
                data={audioStore.allSounds}
                renderItem={ (sound) => 
                    <ListItem 
                        row={ sound } 
                        onDelete={onDelete} 
                        controls={props.controls} 
                        selected={ selected === sound.item.id }
                        onSelected={(newValue) => onSelected(sound.item, newValue)} 
                    />}
                keyExtractor={(sound) => sound.id}
                ItemSeparatorComponent={flatlistSeparator}
            />
            {modalVisible ? <AudioRecorder closeModal={recorderComplete} /> : null}
        </View>
    )
})

export default AudioLibrary