import React, { useState } from "react"
// TextInput HOC?
import { View, ViewStyle, TextStyle, TextInput, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"
import { PlayGameProps } from "../../navigators"
import { useStores } from "../../models"

import { SoundMatchGame } from "../../models/sound-match/sound-match-game"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.primaryBackground,
  paddingHorizontal: spacing[4],
}

const BOLD: TextStyle = { fontWeight: "bold" }
const PRIMARYTEXTCOLOR: TextStyle = { color: color.palette.darkBlue }
const TEXT: TextStyle = {
  ...PRIMARYTEXTCOLOR,
  fontFamily: typography.primary,
}

const GAME_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  textAlign: "center",
}

const GAME_TITLE_CONTAINER: ViewStyle = {
  flex: 10,
  justifyContent: "center",

  paddingHorizontal: spacing[6],
  paddingTop: 20,
  paddingBottom: 50,
}

const MATCHING_PIECES_CONTAINER: ViewStyle = {
  flex: 10,
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap",

  marginHorizontal: 2,

  // paddingHorizontal: spacing[2],
  // paddingBottom: 0,
}

// const MATCHING_PIECES_ROW: ViewStyle = {
//   justifyContent: "center",
//   flexDirection: "row",
//   paddingBottom: 20,
// }

//divisble by 3 - rows of 3,
const BUTTONS: ViewStyle = {
  marginHorizontal: spacing[3],
  paddingVertical: spacing[2],
  marginTop: 10,
  borderRadius: 100,

  height: 90,
  width: 90,

  shadowColor: color.palette.darkBlue,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 1.0,
  shadowRadius: 1,

  backgroundColor: color.palette.skyBlue,
  borderWidth: 1,
  borderColor: color.palette.darkBlue,
}

const ACTIVATED_BUTTONS: ViewStyle = {
  ...BUTTONS,
  backgroundColor: color.palette.lighterGrey,
  borderWidth: 1,
  borderColor: color.palette.skyBlue,
  shadowOpacity: 0,
}

const NOT_A_PAIR_BUTTONS: ViewStyle = {
  ...BUTTONS,
  backgroundColor: color.palette.angry,
  borderWidth: 1,
}

const YES_A_PAIR_BUTTONS: ViewStyle = {
  ...BUTTONS,
  backgroundColor: color.palette.btnGreen,
  borderWidth: 1,
}

const HEADER: TextStyle = {
  color: color.palette.black,

  paddingTop: spacing[5],
  paddingBottom: spacing[2] - 2,
  paddingHorizontal: 0,
}

export const GeneratedGame = observer(function GeneratedGame(props: PlayGameProps) {
  const { gameId } = props.route.params
  const { soundMatchStore } = useStores()

  const game = soundMatchStore.getGame(gameId)

  const navigation = useNavigation()
  // const nextScreen = () => navigation.navigate("login")
  const goBack = () => navigation.goBack()

  const [activated, setActivated] = useState<any>()

  const questions: any[] = [
    { id: 1, partner: 2 },
    { id: 2, partner: 1 },
    { id: 3, partner: 4 },
    { id: 4, partner: 3 },
    { id: 5, partner: 6 },
    { id: 6, partner: 5 },
    { id: 7, partner: 8 },
    { id: 8, partner: 7 },
    { id: 9, partner: 10 },
    { id: 10, partner: 9 },
    { id: 11, partner: 12 },
    { id: 12, partner: 11 },
    // { id: 13, partner: 14 },
    // { id: 14, partner: 13 },
  ]

  const pressed = (q: any) => {
    // const activatedButtonStyle = ACTIVATED_BUTTONS
    // const defaultButtonStyle = BUTTONS
    // const notAPairStyle = NOT_A_PAIR_BUTTONS
    // const yesAPairStyle = YES_A_PAIR_BUTTONS
    if (activated) {
      if (activated.partner === q.id) {
        alert("yes")
        // return `style={yesAPairStyle}`
      } else {
        alert("no")
      }
      setActivated(null)
    } else {
      setActivated(q)
      // return `style={defaultButtonStyle`
    }
  }

  // let returnButton = () => {
  //   return (
  //     <View style={MATCHING_PIECES_CONTAINER}>
  //       <Text>{pressed}</Text>
  //       {questions.map((q) => (
  //         <Button
  //           key={q.id}
  //           onPress={() => pressed(q)}
  //           // style={activated && activated.id === q.id ? ACTIVATED_BUTTONS : BUTTONS}
  //           style={BUTTONS}
  //         ></Button>
  //       ))}
  //     </View>
  //   )
  // }

  // const goAssignMatches = () => navigation.navigate("assign_matches")
  // const goMainMenu = () => navigation.navigate("main_menu")

  return (
    <View testID="GeneratedGameScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          // headerTx="demoScreen.howTo"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
        />
        <View style={GAME_TITLE_CONTAINER}>
          <Text style={GAME_TITLE}>{game.title}</Text>
        </View>
        {/* {returnButton()} */}
        {/*         
        <View style={PLAYER_SCORE_CONTAINER}>
          <View style={PLAYER_SCORE} text="Player 1 {Score}"></View>
        </View> */}
        {/* turns */}
        <View style={MATCHING_PIECES_CONTAINER}>
          {questions.map((q) => (
            <Button
              key={q.id}
              onPress={() => pressed(q)}
              style={activated && activated.id === q.id ? ACTIVATED_BUTTONS : BUTTONS}
            ></Button>
          ))}
        </View>
      </Screen>
    </View>
  )
})
