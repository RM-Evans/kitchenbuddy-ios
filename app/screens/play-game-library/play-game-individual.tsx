import React, { useState } from "react"
//TextInput HOC?
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"
import { palette } from "../../theme/palette"

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

const GAME_INFO_CONTAINER: ViewStyle = {
  //   alignItems: "center",

  borderBottomWidth: 1,

  paddingHorizontal: spacing[2],
  paddingVertical: 50,
}

const GAME_NAME: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 30,
  paddingBottom: 20,
}

const GAME_DIFFICULTY: TextStyle = {
  ...TEXT,
  fontSize: 22,
  paddingBottom: 20,
}
const GAME_DESCRIPTION: TextStyle = {
  ...TEXT,
  fontSize: 20,
}

const GAME_SETUP_CONTAINER: ViewStyle = {
  //   alignItems: "center",

  borderColor: color.palette.angry,
  borderWidth: 2,

  marginTop: 30,

  paddingHorizontal: spacing[6],
  paddingBottom: 20,
}

// const IS_ACTIVE: ViewStyle = {
//   backgroundColor: color.palette.angry,
// }

// const NOT_ACTIVE: ViewStyle = {
//   backgroundColor: color.palette.skyBlue,
// }

const SELECTED_PLAYER_COUNT = StyleSheet.create({
  notSelected: {
    height: 40,
    backgroundColor: color.palette.skyBlue,
    borderRadius: 5,
    padding: 10,
  },
  isSelected: {
    backgroundColor: color.palette.angry,
  },
})

const DUMMYGAMEDATA = {
  id: "1",
  title: "Animal match",
  difficulty: "2",
  description:
    "This is an educational game for young children to match animal sounds with the spoken name of the correlating animal",
}

export const GameIndividual = observer(function GameIndividual() {
  const navigation = useNavigation()

  const goBack = () => navigation.goBack()

  const goLogin = () => navigation.navigate("login")

  const [playerCount, setPlayerCount] = useState(null)

  // TODO: on press, setPlayerCount ----> if playerCount === button, change the style sheet

  //   // push a item onto our array of selected, or remove it
  //   const togglePlayerCount = (item: any) => {
  //     const idx = playerCount.findIndex((e) => e.id === item.id)
  //     if (idx >= 0) {
  //       let items = [...playerCount]
  //       items.splice(idx, 1)
  //       setPlayerCount(items)
  //     } else {
  //       setPlayerCount([...playerCount, item])
  //     }
  //   }

  // const renderItem = ({ button }) => {
  //   // const backgroundColor = item.id === selectedId ? palette.offWhite : palette.skyBlue;
  //   // const color = item.id === selectedId ? palette.darkBlue : palette.white;

  //   const isSelected = playerCount.findIndex((e) => e.id === button.id) >= 0

  //   const backgroundColor = isSelected ? palette.offWhite : palette.skyBlue
  //   const color = isSelected ? palette.darkBlue : palette.white

  //   return (
  //     <Button
  //       onPress={() => toggleOption(button)}
  //       backgroundColor={{ backgroundColor }}
  //       textColor={{ color }}
  //     />
  //   )
  // }

  // const selectedPlayerCount = () => {
  //   if (playerCount) {
  //     const isActive = IS_ACTIVE
  //   } else {
  //   }
  // }

  //   const goMainMenu = () => navigation.navigate("main_menu")

  return (
    <View testID="GameIndividual" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          style={{ borderColor: palette.angry, borderWidth: 2 }}
          leftIcon={"back"}
          onLeftPress={goBack}
        />
        <View style={GAME_INFO_CONTAINER}>
          <Text style={GAME_NAME}>{DUMMYGAMEDATA.title}</Text>
          <Text style={GAME_DIFFICULTY}>level {DUMMYGAMEDATA.difficulty}</Text>
          <Text style={GAME_DESCRIPTION}>{DUMMYGAMEDATA.description}</Text>
        </View>

        <View style={GAME_SETUP_CONTAINER}>
          <Button onPress={() => setPlayerCount} />
          <Button onPress={() => setPlayerCount} />
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
