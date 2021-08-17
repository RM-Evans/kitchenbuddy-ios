import React, { useState } from "react"
// TextInput HOC?
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  SafeAreaView,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"
import { palette } from "../../theme/palette"

const BOLD: TextStyle = { fontWeight: "bold" }
const PRIMARYTEXTCOLOR: TextStyle = { color: color.palette.darkBlue }
const TEXT: TextStyle = {
  ...PRIMARYTEXTCOLOR,
  fontFamily: typography.primary,
}

const VIEW_STYLE = {
  paddingTop: 50,
  backgroundColor: color.palette.skyBlue,
}

const GAME_TITLE_AND_DIFFICULTY: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 20,
  textAlign: "center",
}

const MODAL_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const MODAL_MAIN: ViewStyle = {}

const MODAL_LIST: ViewStyle = {}

const LIST_CARD: ViewStyle = {
  flexDirection: "row",

  padding: 20,
}

// TODO rme - step 1: Set the data up from pseudo.txt (ID, title, soundFile) add ID later
const DATA = [
  {
    id: "1",
    title: "Lion - Roaring",
    soundFile: "lionRoar.mp3",
  },
  {
    id: "2",
    title: "Lion - Word",
    soundFile: "TTS_LION.mp3",
  },
  {
    id: "3",
    title: "Cow - Mooing",
    soundFile: "cowMoo.mp3",
  },
  {
    id: "4",
    title: "Cow - Word",
    soundFile: "TTS_COW.mp3",
  },
  {
    id: "5",
    title: "Dog - Bark",
    soundFile: "dogBark.mp3",
  },
  {
    id: "6",
    title: "Dog - Word",
    soundFile: "TTS_DOG.mp3",
  },
  {
    id: "7",
    title: "Cat - Meow",
    soundFile: "catMeow.mp3",
  },
  {
    id: "8",
    title: "Cat - Word",
    soundFile: "TTS_CAT.mp3",
  },
  {
    id: "9",
    title: "Rooster - Crowing",
    soundFile: "roosterCrowing.mp3",
  },
  {
    id: "10",
    title: "Rooster - Word",
    soundFile: "TTS_ROOSTER.mp3",
  },
  {
    id: "11",
    title: "Horse - Neigh",
    soundFile: "scaredHorseNeighing.mp3",
  },
  {
    id: "12",
    title: "Horse - Word",
    soundFile: "TTS_HORSE.mp3",
  },
  {
    id: "13",
    title: "Monkey - Grunt",
    soundFile: "excitedMonkeyGrunt.mp3",
  },
  {
    id: "14",
    title: "Monkey - Word",
    soundFile: "TTS_MONKEY.mp3",
  },
  {
    id: "15",
    title: "Cricket - Chirp",
    soundFile: "singleCricketChirp.mp3",
  },
  {
    id: "16",
    title: "Cricket - Word",
    soundFile: "TTS_CRICKET.mp3",
  },
  {
    id: "17",
    title: "Goose - Honk",
    soundFile: "flockOfGeese.mp3",
  },
  {
    id: "18",
    title: "Goose - Word",
    soundFile: "TTS_GOOSE.mp3",
  },
  {
    id: "19",
    title: "Wolf - Howl",
    soundFile: "wolfHowl.mp3",
  },
  {
    id: "20",
    title: "Wolf - Word",
    soundFile: "TTS_WOLF.mp3",
  },
  {
    id: "21",
    title: "Sheep - Bah",
    soundFile: "wolfHowl.mp3",
  },
  {
    id: "22",
    title: "Sheep - Word",
    soundFile: "TTS_SHEEP.mp3",
  },
]

// select
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[LIST_CARD, backgroundColor]}>
    <Button>
      <Text>play</Text>
    </Button>
    <Text style={{ ...TEXT, paddingLeft: 20 }}>{item.title}</Text>
  </TouchableOpacity>
)

interface DummyModalProps {
  closeModal: (item: any) => unknown
}

export const DummyModal = observer(function DummyModal(props: DummyModalProps) {
  const [selected, setSelected] = useState<any[]>([])

  // push a item onto our array of selected, or remove it
  // const toggleOption = (item: any) => {
  //   const idx = selected.findIndex((e) => e.id === item.id)
  //   if (idx >= 0) {
  //     const items = [...selected]
  //     items.splice(idx, 1)
  //     setSelected(items)
  //   } else {
  //     setSelected([...selected, item])
  //   }
  // }

  const toggleOption = (item: any) => {
    // we can just do this now that it's single
    props.closeModal(item)

    /* If we wanted them to CONFIRM */
    // const idx = selected.findIndex((e) => e.id === item.id)
    // if (idx >= 0) {
    //   setSelected([])
    // } else {
    //   setSelected([item])
    // }
  }

  const renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? palette.offWhite : palette.skyBlue;
    // const color = item.id === selectedId ? palette.darkBlue : palette.white;

    const isSelected = selected.findIndex((e) => e.id === item.id) >= 0

    const backgroundColor = isSelected ? palette.offWhite : palette.skyBlue
    const color = isSelected ? palette.darkBlue : palette.white

    return (
      <Item
        item={item}
        onPress={() => toggleOption(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    )
  }

  const doClose = (item: any) => {
    if (selected.length !== 1) {
      alert("Please select only 1 option")
      return
    }
    props.closeModal(selected[0])
  }

  return (
    <View style={MODAL_CONTAINER}>
      <Modal
        style={MODAL_MAIN}
        animationType="slide"
        transparent={true}
        visible={true}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={VIEW_STYLE}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={MODAL_LIST}
          />

          <View>
            {/* <Text style={GAME_TITLE_AND_DIFFICULTY}>Hello World!</Text> */}
            <Button
              // style={[styles.button, styles.buttonClose]}
              // when item selected, enable button to send to confirm selection/close modal
              textStyle={GAME_TITLE_AND_DIFFICULTY}
              text={
                "Confirm " +
                (selected.length === 1 ? selected[0].title : `${selected.length} options`)
              }
              onPress={doClose}
            ></Button>
          </View>
        </View>
      </Modal>
    </View>
  )
})
