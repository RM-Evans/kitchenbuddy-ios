import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { View, Text, FlatList, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { range } from "ramda"
import { color, typography } from "../../theme"
import {
    Button,
    Header,
    Screen,
    // Text,
    Wallpaper,
    AutoImage as Image,
    PlaySoundTest,
  } from "../../components"

import AudioRecorder from './audio-recorder'

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
  

const ListItem = ({ item: { item } }) => (
    <TouchableOpacity onPress={() => {console.log('pressed')}}>
      <View style={FLATLIST_ITEM}>
        <Button style={FLATLIST_ITEM_DIFFICULTY} text="play">
            
        </Button>
        <Text style={FLATLIST_ITEM_TITLE}>{item.title}</Text>
        <Text> {item.path}</Text>
      </View>
    </TouchableOpacity>
  )
const flatlistSeparator = () => {
    return <View style={FLATLIST_SEPARATOR} />
}

const AudioLibrary = observer(function AudioLibrary() {

    const { audioStore } = useStores()
    const [modalVisible, setModalVisible] = useState(false)

    const sounds = range(1,10).map(i => ({ id: `uuid-${i}`, path: `/foo/bar/${i}.mp4`, title: `Sound ${i}`}))



    const addSound = () => {
        console.log('add?')
        setModalVisible(true)
    }

    const recorderComplete = async (item: any | undefined) => {
        console.log('save?', item)
        setModalVisible(false)
    }
    
    return (
        <View testID="AudioLibrary">

            <View style={FLATLIST_ITEM}>
                <Text style={FLATLIST_ITEM_TITLE}>Audio Library</Text>
                <Button onPress={addSound} text="+"/>
                <Text>Visible? { modalVisible ? 'yes' : 'no' }</Text>
            </View>
            <FlatList
                data={sounds}
                renderItem={(item) => <ListItem item={item} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={flatlistSeparator}
            />
            {modalVisible ? <AudioRecorder closeModal={recorderComplete} /> : null}
        </View>
        )
})

export default AudioLibrary