import React, { useState } from "react"
// TextInput HOC?
import { View, ViewStyle, TextStyle, TextInput, SafeAreaView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"

import { AssignMatchesProps } from "../../navigators/main-navigator"

// import Pairing, { PairType } from "./pairing"
import { useStores } from "../../models"
import AudioLibrary from "../../components/audio-library/audio-library"

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
    defaultModel.pairs.push({})
  }

  const [model, setModel] = useState<ModelType>(defaultModel)

  const isMissing = model.pairs.reduce(
    (prev, pair) => prev || (pair.question === "" && pair.answer === ""),
    false,
  )

  const doSave = () => {
    if (isMissing) {
      return alert('Please fill in all the "Q?" and "A?" pairs to continue')
    }

    const pairs = model.pairs.map((p) => ({
      question: p.question.id,
      answer: p.answer.id
    }))
    console.log(pairs)
    soundMatchStore.createGame(title, pairs)

    goMainMenu()
  }


  const [modalVisible, setModalVisible] = useState(false)
  const [target, setTarget] = useState<{ idx: number, type: 'question' | 'answer'} | undefined>()
  const [selected, setSelected] = useState<any | undefined>()
  const showModal = (type: 'question' | 'answer', idx: number) => () => {
    console.log('sup', target, type)
    // modal already open
    if( !target ){
      setTarget({ idx, type })
      setModalVisible(true)
      setSelected(undefined)
    }
  }

  const chooseSound = (sound?: any) => {
    if( target ){
      const pair = model.pairs[target.idx]
      pair[target.type] = sound
      setModel({ ...model })

      setSelected(undefined)
      setModalVisible(false)
      setTarget(undefined)
    }
  }

  const components = modalVisible 
    ? (
      <React.Fragment>
        <AudioLibrary onSelected={setSelected} controls={{ add: true, delete: false, select: true }} />
        <Button disabled={!selected} style={ { ...MATCH_ASSIGN_BUTTONS, ...(selected ? {} : {backgroundColor: 'gray'}) }} onPress={() => chooseSound(selected)} text="Continue"/>
        {/* <Text>{ selected ? 'yes' : 'no' }</Text> */}
      </React.Fragment>
    )
    : (
      <React.Fragment>
        <View style={TITLE_FORM_CONTAINER}>
            <Text style={GAME_TITLE_AND_DIFFICULTY} text={props.route.params.title} />
          </View>

        <View>
          {model.pairs.map((pair: PairType, idx: number) => (
            // <View key={idx}>
              // <Text>{ JSON.stringify(pair) }</Text>
              <View style={MATCH_ASSIGN_BUTTONS_CONTAINER} key={idx}>
                <Button style={MATCH_ASSIGN_BUTTONS} onPress={showModal('question', idx)}>
                  <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>
                    { pair.question?.title || pair.question?.id || 'Q?' }
                  </Text>
                </Button>

                <View style={BTN_CONNECTOR}></View>

                <Button style={MATCH_ASSIGN_BUTTONS} onPress={showModal('answer', idx)}>
                  <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>
                    { pair.answer?.title || pair.answer?.id || 'A?' }
                  </Text>
                </Button>
              </View>
            // </View>
          ))}
        </View>

        <Button style={CREATE_BUTTON} onPress={doSave}>
          <Text style={CREATE_BUTTON_TEXT}>CREATE</Text>
        </Button>
        
      </React.Fragment>
    ) 


  return (
    <View testID="AssignMatchesScreen" style={FULL}>
      <View style={CONTAINER} >
        <SafeAreaView>
          <Header
            // headerTx="demoScreen.howTo"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
          />
          { components }
          
        </SafeAreaView>
      </View>
    </View>
  )
})

export type PairType = { 
  question?: any, 
  answer?: any, 
} 

const BTN_CONNECTOR: ViewStyle = {
  top: 40,
  width: 30,
  height: 2,
  marginHorizontal: -10,
  justifyContent: "center",
  backgroundColor: color.palette.black,
}


const MATCH_ASSIGN_BUTTONS_CONTAINER: ViewStyle = {
  flex: 10,
  justifyContent: "center",
  flexDirection: "row",
  paddingBottom: 120,
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

// const BOLD: TextStyle = { fontWeight: "bold" }
// const PRIMARYTEXTCOLOR: TextStyle = { color: color.palette.darkBlue }
// const TEXT: TextStyle = {
//   ...PRIMARYTEXTCOLOR,
//   fontFamily: typography.primary,
// }


const MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.palette.offWhite,
  fontSize: 20,
}
