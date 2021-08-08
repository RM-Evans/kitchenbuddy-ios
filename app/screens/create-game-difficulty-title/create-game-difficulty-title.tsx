import React, { useState } from "react"
// TextInput HOC?
import { View, ViewStyle, TextStyle, TextInput, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"

import { PrimaryParamList } from '../../navigators/main-navigator'

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

const GAME_TITLE_DESCRIPTION: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 20,
  textAlign: "center",
}

const TITLE_FORM_CONTAINER: ViewStyle = {
  flex: 10,
  justifyContent: "center",

  paddingHorizontal: spacing[6],
  paddingTop: 20,
  paddingBottom: 50,
}

const FORMTEXT: TextStyle = { fontSize: 20, paddingLeft: 10 }
const FORM_FIELD: ViewStyle = {
  ...FORMTEXT,
  height: 45,

  // borderWidth:1,

  borderBottomWidth: 2,

  // borderRadius: 15,

  borderColor: color.palette.darkBlue,
  marginTop: 30,
}

const DIFFICULTY_BUTTONS_CONTAINER: ViewStyle = {
  flex: 10,
  justifyContent: "center",

  paddingHorizontal: spacing[2],
  paddingBottom: 50,
}

const DIFFICULTY_BUTTONS: ViewStyle = {
  marginHorizontal: spacing[6],
  paddingVertical: spacing[2],
  marginTop: 30,
  borderRadius: 20,
  height: 100,

  backgroundColor: color.palette.skyBlue,
  borderWidth: 2,
  borderColor: color.palette.darkBlue,
}

const DIFFICULTY_BUTTONS_PRIMARY_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.palette.offWhite,
  fontSize: 30,
}

const DIFFICULTY_BUTTONS_SECONDARY_TEXT: TextStyle = {}

const NEXT_BUTTON: ViewStyle = {
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

const NEXT_BUTTON_TEXT: TextStyle = {
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

export const ChooseTitleAndDifficulty = observer(function ChooseTitleAndDifficulty() {
  const navigation = useNavigation()


  const [model, setModel] = useState({
    title: '',
    pairCount: -1
  })

  const setTitle = title => setModel({ ...model, title })
  const setPairCount = pairCount => () => setModel({ ...model, pairCount })

  // const nextScreen = () => navigation.navigate("login")
  const goBack = () => navigation.goBack()


  const goAssignMatches = () => navigation.navigate('assignMatches', model )
  // const goMainMenu = () => navigation.navigate("main_menu")

  const isDisabled = () => {
    return model.title.trim().length <= 0 && model.pairCount <= 0
  }

  return (
    <View testID="CreateGameDifficultyTitleScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          // headerTx="demoScreen.howTo"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
        />

        <Text>{ JSON.stringify(model) }</Text>

        <View style={TITLE_FORM_CONTAINER}>
          <Text style={GAME_TITLE_DESCRIPTION}>Name your game:</Text>

          <TextInput style={FORM_FIELD} value={model.title} onChangeText={setTitle} placeholder="game title" autoCapitalize="none" />
        </View>

        <View style={DIFFICULTY_BUTTONS_CONTAINER}>
          <Button style={DIFFICULTY_BUTTONS} onPress={setPairCount(2)}>
            <Text style={DIFFICULTY_BUTTONS_PRIMARY_TEXT}>DEBUG</Text>
            <Text style={DIFFICULTY_BUTTONS_SECONDARY_TEXT}>2 pairs</Text>
          </Button>

          <Button style={DIFFICULTY_BUTTONS} onPress={setPairCount(6)}>
            <Text style={DIFFICULTY_BUTTONS_PRIMARY_TEXT}>1</Text>
            <Text style={DIFFICULTY_BUTTONS_SECONDARY_TEXT}>6 pairs</Text>
          </Button>

          <Button style={DIFFICULTY_BUTTONS} onPress={setPairCount(10)}>
            <Text style={DIFFICULTY_BUTTONS_PRIMARY_TEXT}>2</Text>
            <Text style={DIFFICULTY_BUTTONS_SECONDARY_TEXT}>10 pairs</Text>
          </Button>

          <Button style={DIFFICULTY_BUTTONS} onPress={setPairCount(14)}>
            <Text style={DIFFICULTY_BUTTONS_PRIMARY_TEXT}>3</Text>
            <Text style={DIFFICULTY_BUTTONS_SECONDARY_TEXT}>14 pairs</Text>
          </Button>
        </View>

        <Button style={NEXT_BUTTON} onPress={goAssignMatches} disabled={isDisabled()}>
          <Text style={NEXT_BUTTON_TEXT}>NEXT</Text>
        </Button>
        {/* FOR DEVVING */}
        {/* <Text style={SIGNUP_REDIRECT_TEXT}>
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
