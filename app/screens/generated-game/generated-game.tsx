import React, { useEffect, useState } from "react"
// TextInput HOC?
import { View, ViewStyle, TextStyle, TextInput, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"
import { PlayGameProps } from "../../navigators"
import { useStores } from "../../models"

import { SoundMatchGame } from "../../models/sound-match/sound-match-game"

import { ResolvableSound } from "../../components/sound-player/sound-library-sounds"
import { palette } from "../../theme/palette"

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

//divisible by 3 - rows of 3,
const BUTTONS: ViewStyle = {
  marginHorizontal: spacing[3],
  paddingVertical: spacing[2],
  marginTop: 10,
  borderRadius: 100,

  // height: 90,
  // width: 90,

  height: 100,
  width: 100,

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

//todo -- if button is pressed, then change to this style UNTIL we decide if it is or isnt a pair
const ACTIVATED_BUTTONS: ViewStyle = {
  ...BUTTONS,
  backgroundColor: color.palette.lighterGrey,
  borderWidth: 1,
  borderColor: color.palette.skyBlue,
  shadowOpacity: 0,
}

//todo -- if NOT a pair, BRIEFLY assign the buttons this style --- THEN go back to default style BUTTONS
const IS_MATCH_BUTTONS: ViewStyle = {
  ...BUTTONS,
  backgroundColor: color.palette.btnGreen,
  borderWidth: 1,
  borderColor: color.palette.btnGreen,
  shadowOpacity: 0,
}

// const NOT_A_PAIR_BUTTONS: ViewStyle = {
//   ...BUTTONS,
//   backgroundColor: color.palette.angry,
//   borderWidth: 1,
// }

// //todo -- if its a pair, assign the buttons this style
// const YES_A_PAIR_BUTTONS: ViewStyle = {
//   ...BUTTONS,
//   backgroundColor: color.palette.btnGreen,
//   borderWidth: 1,
// }

// styles for the revealText toggle switch -- toggleText()

// - HIDDEN and DEFAULT text for buttons (q.children)
const HIDE_TEXT: TextStyle = {
  opacity: 0,
}
// - VISIBLE text style for rendered children of buttons (eg: q.text)
const SHOW_BUTTON_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  opacity: 1,
}

const TOGGLE_TEXT_BUTTON: ViewStyle = {
  height: 40,
  width: 100,
  alignSelf: "center",
  marginTop: 50,
  backgroundColor: color.transparent,
  borderColor: palette.darkBlue,
  borderWidth: 2,
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

  try {
    game.pairs[0]
  } catch (err) {
    navigation.navigate("main_menu")
    return (
      <View>
        <Text>Failure! </Text>
      </View>
    )
  }

  // const nextScreen = () => navigation.navigate("login")
  const goBack = () => navigation.goBack()

  const [activated, setActivated] = useState<any>()

  const [questions, setQuestions] = useState<any[]>() // intentionally null for lazy load

  const [completed, setCompleted] = useState<any[]>([])

  const [mismatched, setMismatched] = useState<any[]>([])

  const [revealText, setRevealText] = useState<boolean>(false)

  const isCompleted = (target) =>
    completed.findIndex((id) => id === (target.id !== undefined ? target.id : target)) >= 0

  if (!questions && game.pairs.length) {
    const tmp: any[] = []
    let qid = 0
    game.pairs.forEach((e) => {
      const q: any = {
        id: qid++,
        text: e.questionText,
        sound: e.questionSound,
        type: "question",
        sourceId: e.id,
      }
      const a: any = {
        id: qid++,
        text: e.answerText,
        sound: e.answerSound,
        type: "answer",
        sourceId: e.id,
      }
      q.partner = a.id
      a.partner = q.id

      tmp.push(q)
      tmp.push(a)
      // questions.splice(0, 0, [q, a])
    })

    setQuestions(shuffleArray(tmp))
    console.log("init questions")
  }

  const pressed = async (q: any) => {
    const sound = new ResolvableSound(q.sound)
    sound.play().catch((err) => {
      console.warn("failed", err)
    })

    if (completed.findIndex((id) => id === q.id) >= 0) {
      return
    }

    // const activatedButtonStyle = ACTIVATED_BUTTONS
    // const defaultButtonStyle = BUTTONS
    // const notAPairStyle = NOT_A_PAIR_BUTTONS
    // const yesAPairStyle = YES_A_PAIR_BUTTONS
    // console.log(q)
    if (activated) {
      if (activated.partner === q.id) {
        setCompleted([...completed, activated.id, q.id])
        // return `style={yesAPairStyle}`

        // handle winning
        // NOTE: we don't have the updated state yet from `setCompleted`, so we're just cheating
        if (completed.length + 2 === questions.length) {
          alert("Congratulations! In the future we'd rank your progress!")
          navigation.navigate("main_menu")
        }
      } else {
        setMismatched([activated.id, q.id])
      }
      setActivated(null)
    } else {
      setActivated(q)
      setMismatched([])
      // return `style={defaultButtonStyle`
    }
  }

  //conditially render "revealText" -- text appears on button if the user toggles switch

  //toggle for showing and hiding text
  const toggleText = (q: any) => {
    setRevealText(!revealText)
  }

  return (
    <View testID="GeneratedGameScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header leftIcon="back" onLeftPress={goBack} style={HEADER} />
        <View style={GAME_TITLE_CONTAINER}>
          <Text style={GAME_TITLE}>{game.title}</Text>
        </View>
        {/*         
        <View style={PLAYER_SCORE_CONTAINER}>
          <View style={PLAYER_SCORE} text="Player 1 {Score}"></View>
        </View> */}
        {/* turns */}
        <View style={MATCHING_PIECES_CONTAINER}>
          {/* <Text style={{ color: "black" }}>
            {JSON.stringify(completed)}
            {JSON.stringify(mismatched)}
            {JSON.stringify(questions)}
          </Text> */}

          {questions &&
            questions.map((q) => {
              const isMatched = isCompleted(q)
              const isActive = activated && activated.id === q.id
              const isIncorrect = mismatched && mismatched.findIndex((id) => id === q.id) >= 0

              let style = BUTTONS

              if (isMatched) {
                style = IS_MATCH_BUTTONS
              } else if (isActive) {
                style = ACTIVATED_BUTTONS
              } else if (isIncorrect) {
                style = { ...BUTTONS, backgroundColor: "#ff0000" }
              }

              //optional toggle text using style
              let textStyle = revealText ? SHOW_BUTTON_TEXT : HIDE_TEXT

              return (
                <Button
                  key={q.id}
                  onPress={() => pressed(q)}
                  style={style}
                  textStyle={textStyle}
                  text={revealText ? q.text : ""}
                  //optionally use `text={revealText ? q.text : ""}` rather than styling to toggle q.text
                />
              )
            })}
        </View>
        <Button
          onPress={toggleText}
          style={TOGGLE_TEXT_BUTTON}
          textStyle={{ ...TEXT, ...BOLD, fontSize: 12 }}
          text={revealText ? "hide text" : "reveal text"}
        ></Button>
      </Screen>
    </View>
  )
})

function shuffleArray(array: any[]) {
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}
