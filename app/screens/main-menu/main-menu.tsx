import React, { useState } from "react"
//TextInput HOC?
import { View, ViewStyle, TextStyle, TextInput, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"

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

const MENU_BUTTONS_CONTAINER: ViewStyle = {
  flex: 10,
  justifyContent: "center",

  paddingHorizontal: spacing[2],
  paddingBottom: 100,
}

const MENU_BUTTONS: ViewStyle = {
  marginHorizontal: spacing[6],
  paddingVertical: spacing[2],
  marginTop: 50,
  borderRadius: 20,
  height: 150,

  backgroundColor: color.palette.skyBlue,
  borderWidth: 2,
  borderColor: color.palette.darkBlue,
}

const MENU_BUTTONS_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.palette.offWhite,
  fontSize: 30,
}

const HOW_TO_PLAY_MENU_BUTTON: ViewStyle = {
  backgroundColor: color.transparent,
  marginTop: 30,
}

const HOW_TO_PLAY_MENU_BUTTON_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 20,
  textDecorationLine: "underline",
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

export const MainMenu = observer(function MainMenu() {
  const navigation = useNavigation()
  // const nextScreen = () => navigation.navigate("login")
  const goBack = () => navigation.goBack()

  const goLogin = () => navigation.navigate("login")

  const goGameLibrary = () => navigation.navigate("game_library")

  const goChooseDifficulty = () => navigation.navigate("choose_difficulty")

  const goChooseDifficultyAndTitle = () => navigation.navigate("choose_title_difficulty")

  return (
    <View testID="LoginScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        {/* <Header
                headerText="login"
                leftIcon="back"
                onLeftPress={goBack}
                style={HEADER}
                titleStyle={HEADER_TITLE}
                /> */}

        <View style={MENU_BUTTONS_CONTAINER}>
          <Button style={MENU_BUTTONS} onPress={goGameLibrary}>
            <Text style={MENU_BUTTONS_TEXT}>PLAY</Text>
          </Button>

          <Button style={MENU_BUTTONS} onPress={goChooseDifficulty}>
            <Text style={MENU_BUTTONS_TEXT}>CREATE GAME</Text>
          </Button>

          <Button style={HOW_TO_PLAY_MENU_BUTTON}>
            <Text style={HOW_TO_PLAY_MENU_BUTTON_TEXT}>HOW TO PLAY</Text>
          </Button>
        </View>

        {/* FOR DEVVING */}

        <Text style={SIGNUP_REDIRECT_TEXT}>
          diff and title
          <Text style={SIGNUP_REDIRECT_LINK} onPress={goChooseDifficultyAndTitle}>
            {" "}
            menu{" "}
          </Text>
        </Text>

        <Text style={SIGNUP_REDIRECT_TEXT}>
          Already have an account?
          <Text style={SIGNUP_REDIRECT_LINK} onPress={goLogin}>
            {" "}
            Login{" "}
          </Text>
        </Text>
      </Screen>
    </View>
  )
})

//on create game, how do I start capturing data from screen to screen, eventually creating one object or "game"?
//on create game, make new thing
