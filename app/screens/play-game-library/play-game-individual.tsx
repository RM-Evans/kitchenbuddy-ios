import React, { useState } from "react"
// TextInput HOC?
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"
import { palette } from "../../theme/palette"
import { SetupGameProps } from "../../navigators"

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

  marginTop: 30,

  paddingHorizontal: spacing[6],
  paddingBottom: 20,
}

interface PLAY_GAME_BUTTON {
  text: TextStyle
  button: ViewStyle
}

const PLAY_GAME_BUTTON = StyleSheet.create<PLAY_GAME_BUTTON>({
  text: { ...TEXT, ...BOLD, fontSize: 25, padding: 10 },
  button: { backgroundColor: color.transparent, borderWidth: 2, borderColor: palette.darkBlue },
})

// const IS_ACTIVE: ViewStyle = {
//   backgroundColor: color.palette.angry,
// }

// const NOT_ACTIVE: ViewStyle = {
//   backgroundColor: color.palette.skyBlue,
// }

// const SELECTED_PLAYER_COUNT = StyleSheet.create({
//   isSelected: {
//     backgroundColor: color.palette.angry,
//   },
//   notSelected: {
//     backgroundColor: color.palette.skyBlue,
//     borderRadius: 5,
//     height: 40,
//     padding: 10,
//   },
// })

const DUMMYGAMEDATA = {
  id: "1",
  title: "Animal match",
  difficulty: "2",
  description:
    "This is an educational game for young children to match animal sounds with the spoken name of the correlating animal",
}

export const GameIndividual = observer(function GameIndividual(props: SetupGameProps) {
  const navigation = useNavigation()

  const { gameId } = props.route.params

  const goBack = () => navigation.goBack()

  const goGeneratedGame = () => {
    navigation.navigate("playGame", { gameId })
  }

  // const [playerCount, setPlayerCount] = useState(null)

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
        <Header leftIcon={"back"} onLeftPress={goBack} />
        <View style={GAME_INFO_CONTAINER}>
          <Text style={GAME_NAME}>{DUMMYGAMEDATA.title}</Text>
          <Text style={GAME_DIFFICULTY}>level {DUMMYGAMEDATA.difficulty}</Text>
          <Text style={GAME_DESCRIPTION}>{DUMMYGAMEDATA.description}</Text>
        </View>

        <View style={GAME_SETUP_CONTAINER}>
          <Button
            onPress={goGeneratedGame}
            style={PLAY_GAME_BUTTON.button}
            textStyle={PLAY_GAME_BUTTON.text}
            text="PLAY GAME"
          />
        </View>
      </Screen>
    </View>
  )
})
