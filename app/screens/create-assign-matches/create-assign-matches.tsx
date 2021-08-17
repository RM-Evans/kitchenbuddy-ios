import React, { useState } from "react"
// TextInput HOC?
import { View, ViewStyle, TextStyle, TextInput, SafeAreaView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"

import { AssignMatchesProps } from "../../navigators/main-navigator"

import Pairing, { PairType } from "./pairing"
import { useStores } from "../../models"

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

type ModelType = {
  pairs: PairType[]
}

export const AssignMatches = observer(function AssignMatches(props: AssignMatchesProps) {
  const navigation = useNavigation()
  const { soundMatchStore } = useStores()

  // const nextScreen = () => navigation.navigate("login")
  const goBack = () => navigation.goBack()

  const goMainMenu = () => navigation.navigate("main_menu")

  const { title, pairCount } = props.route.params
  const defaultModel: ModelType = { pairs: [] }
  for (let i = 0; i < props.route.params.pairCount; i++) {
    defaultModel.pairs.push({ question: "", answer: "" })
  }

  const [model, setModel] = useState<ModelType>(defaultModel)
  const pairSetter = (idx: number) => (pair: PairType) => {
    model.pairs[idx] = pair
    setModel({ ...model })
  }

  const isMissing = model.pairs.reduce(
    (prev, pair) => prev || (pair.question === "" && pair.answer === ""),
    false,
  )

  const doSave = () => {
    if (isMissing) {
      return alert('Please fill in all the "Q?" and "A?" pairs to continue')
    }

    const pairs = model.pairs.map((p) => ({
      questionText: p.question,
      answerText: p.answer,
    }))
    soundMatchStore.createGame(title, pairs)

    goMainMenu()
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
            <Text style={GAME_TITLE_AND_DIFFICULTY} text={props.route.params.title} />
          </View>

          <View>
            {/* { model.pairs.map( (pair: PairType, idx: number) =>  <Text key={idx}> {idx} {pair.question} {pair.answer} </Text> ) }  */}
            {model.pairs.map((pair: PairType, idx: number) => (
              <Pairing key={idx} pair={pair} setPair={pairSetter(idx)} />
            ))}
          </View>

          {/* dont use this component yet */}
          {/* <DummyRow /> */}

          <Button style={CREATE_BUTTON} onPress={doSave}>
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
        </SafeAreaView>
      </Screen>
    </View>
  )
})
