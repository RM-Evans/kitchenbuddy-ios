import React, { useState } from "react"
// TextInput HOC?
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  ImageStyle,
  SafeAreaView,
  FlatList,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { palette } from "../../theme/palette"
import { useStores } from "../../models"

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

const GAME_LIBRARY_PAGE_TITLE_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",

  borderColor: color.palette.angry,
  borderWidth: 2,

  paddingHorizontal: spacing[6],
  paddingBottom: 20,
}

const GAME_LIBRARY_PAGE_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 32,
}

const GAME_LIBRARY_FLATLIST_CONTAINER: ViewStyle = {
  borderColor: color.palette.angry,
  borderWidth: 2,
}

const GAME_LIBRARY_FLATLIST_ITEM: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 30,
}

const GAME_LIBRARY_FLATLIST_ITEM_DIFFICULTY: TextStyle = {
  ...TEXT,

  paddingLeft: 20,
}

const GAME_LIBRARY_FLATLIST_ITEM_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 18,
  paddingLeft: 45,
}

const FLATLIST_SEPARATOR: ViewStyle = {
  height: 1,
  backgroundColor: color.palette.darkBlue,
}

// const DUMMYGAMEDATA = [
//   {
//     id: "1",
//     title: "first game",
//     difficulty: "2",
//   },
//   {
//     id: "2",
//     title: "second game",
//     difficulty: "3",
//   },
//   {
//     id: "3",
//     title: "third game",
//     difficulty: "2",
//   },
//   {
//     id: "4",
//     title: "fourth game",
//     difficulty: "1",
//   },
//   {
//     id: "5",
//     title: "fifth game",
//     difficulty: "2",
//   },
//   {
//     id: "6",
//     title: "sixth game",
//     difficulty: "1",
//   },
//   {
//     id: "7",
//     title: "seventh game",
//     difficulty: "2",
//   },
//   {
//     id: "8",
//     title: "eigth game",
//     difficulty: "2",
//   },
//   {
//     id: "9",
//     title: "ninth game",
//     difficulty: "3",
//   },
//   {
//     id: "10",
//     title: "tenth game",
//     difficulty: "2",
//   },
// ]

// flatlist separator
const flatlistSeparator = () => {
  return <View style={FLATLIST_SEPARATOR} />
}

export const GameLibrary = observer(function GameLibrary() {
  const navigation = useNavigation()

  const { soundMatchStore } = useStores()

  // { for use in header
  const goBack = () => navigation.goBack()

  const goLogin = () => navigation.navigate("login")
  // for use in header }

  const goIndividualGame = () => navigation.navigate("individual_game")

  const goMainMenu = () => navigation.navigate("main_menu")

  // onpress will need to go to page with data unique to the list item object

  // create list <Item>
  const Item = ({ item: { item } }) => (
    <TouchableOpacity onPress={goIndividualGame}>
      <View style={GAME_LIBRARY_FLATLIST_ITEM}>
        <Text style={GAME_LIBRARY_FLATLIST_ITEM_DIFFICULTY}>Q: {item.questions}</Text>
        <Text style={GAME_LIBRARY_FLATLIST_ITEM_TITLE}>{item.title}</Text>
        {/* <Text text=">"></Text> */}
      </View>
    </TouchableOpacity>
  )

  const DUMMYGAMEDATA = soundMatchStore.games.map(g => ({
    id: g.id, 
    title: g.title,
    questions: g.pairs.length,
    difficulty: 'HARD'
  }))

  return (
    <View testID="GameLibrary" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          style={{ borderColor: palette.angry, borderWidth: 2 }}
          leftIcon={"back"}
          onLeftPress={goBack}
        />
        <View style={GAME_LIBRARY_PAGE_TITLE_CONTAINER}>
          <Text style={GAME_LIBRARY_PAGE_TITLE} onPress={goMainMenu}>
            Game Library
          </Text>
        </View>
        <View style={GAME_LIBRARY_FLATLIST_CONTAINER}>
          <FlatList
            data={DUMMYGAMEDATA}
            renderItem={ (item) => <Item item={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={flatlistSeparator}
          />
        </View>
        {/* FOR DEVVING
        <Text style={SIGNUP_REDIRECT_TEXT}>
          main menu
          <Text style={SIGNUP_REDIRECT_LINK} onPress={goMainMenu}>
            {" "}
            menu{" "}
          </Text>
        </Text> */}
      </Screen>
    </View>
  )
})
