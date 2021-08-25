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

const COMPLETED_BUTTONS: ViewStyle = {
  ...BUTTONS,
  backgroundColor: color.palette.btnGreen,
  borderWidth: 1,
  borderColor: color.palette.btnGreen,
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

  const isCompleted = target => completed.findIndex(id => id === ( target.id !== undefined ? target.id : target) ) >= 0

  // TODO rme - step 2: make this use the data ResolvableSound with the data
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
        sound:  e.answerSound,
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
    sound.play().catch(err => {
      console.warn('failed', err)
    })
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
        if( completed.length + 2 === questions.length ){
          alert('Congratulations! In the future we\'d rank your progress!')
          navigation.navigate('main_menu')
        }
      } else {
        console.log("no")
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
          {questions &&
            questions.map((q) => {

              const isComplete = isCompleted(q)
              const isActive = activated && activated.id === q.id

              let style = BUTTONS
              if( isComplete ){
                style = COMPLETED_BUTTONS
              }else if( isActive ){
                style = ACTIVATED_BUTTONS
              }

              return (
                <Button
                  key={q.id}
                  onPress={() => pressed(q)}
                  style={style}
                  text={q.text}
                />
              )
            })}
        </View>
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
