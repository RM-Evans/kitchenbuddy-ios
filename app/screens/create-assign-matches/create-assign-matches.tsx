import React, { useState } from "react"
//TextInput HOC?
import { View, ViewStyle, TextStyle, TextInput, SafeAreaView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"
import { palette } from "../../theme/palette"

import { DummyModal } from "./dummy-modal"
// import { DummyRow } from "./dummy-row"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const BOLD: TextStyle = { fontWeight: "bold" }
const PRIMARYTEXTCOLOR: TextStyle = { color: color.palette.darkBlue }
const TEXT: TextStyle = {
  ...PRIMARYTEXTCOLOR,
  fontFamily: typography.primary,
}

const GAME_TITLE_AND_DIFFICULTY: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 22,
  textAlign: "center",
}

const TITLE_FORM_CONTAINER: ViewStyle = {
  flex: 10,
  justifyContent: "center",

  paddingHorizontal: spacing[6],
  paddingTop: 20,
  paddingBottom: 50,
}

const MATCH_ASSIGN_BUTTONS_CONTAINER: ViewStyle = {
  flex: 10,
  justifyContent: "center",
  flexDirection: "row",

  paddingBottom: 50,
}

const MATCH_ASSIGN_BUTTONS: ViewStyle = {
  marginHorizontal: spacing[3],
  paddingVertical: spacing[2],
  marginTop: 2,
  borderRadius: 20,
  height: 75,
  width: 115,

  backgroundColor: color.palette.skyBlue,
  borderWidth: 2,
  borderColor: color.palette.darkBlue,
}

const MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.palette.offWhite,
  fontSize: 20,
}

const BTN_CONNECTOR: ViewStyle = {
  justifyContent: "center",
  backgroundColor: color.palette.black,
  height: 2,
  width: 30,
  top: 40,
  marginHorizontal: -10,
}

const CREATE_BUTTON: ViewStyle = {
  marginHorizontal: spacing[8],
  paddingVertical: spacing[2],
  marginTop: 0,
  marginBottom: 50,
  borderRadius: 20,
  height: 50,

  backgroundColor: color.transparent,
  borderWidth: 2,
  borderColor: color.palette.darkBlue,
}

const CREATE_BUTTON_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.palette.darkBlue,
  fontSize: 20,
}

const HEADER: TextStyle = {
  color: color.palette.black,

  paddingTop: spacing[5],
  paddingBottom: spacing[2] - 2,
  paddingHorizontal: 0,
}

// const MODAL_CONTAINER: ViewStyle = {
//   flex: 1,
//   justifyContent: "center",
// }

// const MODAL_MAIN: ViewStyle = {}

// const MODAL_LIST: ViewStyle = {}

// const LIST_CARD: ViewStyle = {
//   flexDirection: "row",

//   padding: 20,
// }

// const BUTTON_PAIR_ROW_TEXT_CONTAINER: ViewStyle = {
//   flexDirection: "row",
//   justifyContent: "space-around",
// }

// for devving

const SIGNUP_REDIRECT_TEXT: TextStyle = {
  flex: 1,
  ...TEXT,
  textAlign: "center",
}

const SIGNUP_REDIRECT_LINK: TextStyle = {
  ...TEXT,
  ...BOLD,
  textDecorationLine: "underline",
}

const DATA = [
  {
    id: "1",
    title: "First Item",
  },
  {
    id: "2",
    title: "Second Item",
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
    {/* <Button>
        <Text>select</Text>
      </Button> */}
  </TouchableOpacity>
)

export const AssignMatches = observer(function AssignMatches() {
  const navigation = useNavigation()
  // const nextScreen = () => navigation.navigate("login")
  const goBack = () => navigation.goBack()

  const goMainMenu = () => navigation.navigate("main_menu")

  const [modalVisible, setModalVisible] = useState(false)

  //change some styling when tapping on the rendered list item --- using state
  const [selectedTitle, setSelectedTitle] = useState(null)

  const [selectedId, setSelectedId] = useState(null)

  // const renderItem = ({ item }) => {
  //   const backgroundColor = item.id === selectedId ? palette.offWhite : palette.skyBlue
  //   const color = item.id === selectedId ? palette.darkBlue : palette.white

  //   return (
  //     <Item
  //       item={item}
  //       onPress={() => setSelectedId(item)}
  //       backgroundColor={{ backgroundColor }}
  //       textColor={{ color }}
  //     />
  //   )
  // }

  const [buttonOneObject, setButtonOneObject] = useState<any>(null)

  const dummyModalClosed = (item: any) => {
    setModalVisible(false)
    setButtonOneObject(item)
  }

  return (
    <View testID="AssignMatchesScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <SafeAreaView>
          <Header
            // headerTx="demoScreen.howTo"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
          />

          <View style={TITLE_FORM_CONTAINER}>
            <Text style={GAME_TITLE_AND_DIFFICULTY}>Animal Match - lvl 1</Text>
          </View>

          <View style={MATCH_ASSIGN_BUTTONS_CONTAINER}>
            <Button style={MATCH_ASSIGN_BUTTONS} onPress={() => setModalVisible(true)}>
              <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>
                {buttonOneObject ? buttonOneObject.title : "ROAR"}
              </Text>
            </Button>

            <View style={BTN_CONNECTOR}></View>

            <Button style={MATCH_ASSIGN_BUTTONS} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>LION</Text>
            </Button>
          </View>

          <View style={MATCH_ASSIGN_BUTTONS_CONTAINER}>
            <Button style={MATCH_ASSIGN_BUTTONS} onPress={() => setModalVisible(true)}>
              <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>
                {buttonOneObject ? buttonOneObject.title : "MOO"}
              </Text>
            </Button>

            <View style={BTN_CONNECTOR}></View>

            <Button style={MATCH_ASSIGN_BUTTONS} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>COW</Text>
            </Button>
          </View>

          <View style={MATCH_ASSIGN_BUTTONS_CONTAINER}>
            <Button style={MATCH_ASSIGN_BUTTONS} onPress={() => setModalVisible(true)}>
              <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>
                {buttonOneObject ? buttonOneObject.title : "QUACK"}
              </Text>
            </Button>

            <View style={BTN_CONNECTOR}></View>

            <Button style={MATCH_ASSIGN_BUTTONS} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>DUCK</Text>
            </Button>
          </View>

          {/* dont use this component yet */}
          {/* <DummyRow /> */}

          <Button style={CREATE_BUTTON}>
            <Text style={CREATE_BUTTON_TEXT}>CREATE</Text>
          </Button>

          {/* FOR DEVVING */}
          <Text style={SIGNUP_REDIRECT_TEXT}>
            main menu
            <Text style={SIGNUP_REDIRECT_LINK} onPress={goMainMenu}>
              {" "}
              menu{" "}
            </Text>
          </Text>

          {modalVisible ? <DummyModal closeModal={dummyModalClosed} /> : null}
        </SafeAreaView>
      </Screen>
    </View>
  )
})
