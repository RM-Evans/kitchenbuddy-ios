import React, { useState } from "react"
//TextInput HOC?
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

const DATA = [
  {
    id: "1",
    title: "First Item!",
  },
  {
    id: "2",
    title: "Second Item!",
  },
  {
    id: "3",
    title: "Third Item",
  },
]

//select
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
  const toggleOption = (item: any) => {
    const idx = selected.findIndex((e) => e.id === item.id)
    if (idx >= 0) {
      let items = [...selected]
      items.splice(idx, 1)
      setSelected(items)
    } else {
      setSelected([...selected, item])
    }
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
    console.log("blah", selected)
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
        <View>
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
