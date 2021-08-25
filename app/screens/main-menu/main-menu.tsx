import React, { useState } from "react"
// TextInput HOC?
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  ImageStyle,
  SafeAreaView,
  Alert,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  Wallpaper,
  AutoImage as Image,
  PlaySoundTest,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { useStores } from "../../models"

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
  const { soundMatchStore } = useStores()

  const resetEverything = () => {
    const result = Alert.alert(
      "Delete Everything?",
      "Are you sure you want to delete everything? This is intended for developers demonstrating.",
      [
        {
          text: "Confirm",
          onPress: () => {
            soundMatchStore.deleteEverything()
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("cancelled delete")
          },
          style: "cancel",
        },
      ],
      // {
      //   cancelable: true,
      //   onDismiss: () =>
      //     Alert.alert(
      //       "This alert was dismissed by tapping outside of the alert dialog."
      //     ),
      // }
    )
    console.log(result)
    // soundMatchStore.deleteEverything()
  }

  const navigation = useNavigation()
  // const nextScreen = () => navigation.navigate("login")
  const goBack = () => navigation.goBack()

  const goLogin = () => navigation.navigate("login")

  const goGameLibrary = () => navigation.navigate("gameLibrary")

  const goChooseDifficulty = () => navigation.navigate("choose_difficulty")

  const goChooseDifficultyAndTitle = () => navigation.navigate("choose_title_difficulty")

  // let Sound = require("react-native-sound")

  // const testSound = new Sound("TTS_COW.mp3", Sound.MAIN_BUNDLE, (error) => {
  //   console.log("beforehand")
  //   if (error) {
  //     console.log("failed to load the sound", error)
  //     return
  //   }
  //   console.log("afterhand")
  //   // loaded successfully
  //   console.log(
  //     "duration in seconds: " +
  //       testSound.getDuration() +
  //       "number of channels: " +
  //       testSound.getNumberOfChannels(),
  //   )
  // })

  // const doTheThing = () => {
  //   console.log("test sound here")
  //   console.log("afterhand")
  //   // loaded successfully
  //   console.log(
  //     "duration in seconds:",
  //     testSound.getDuration(),
  //     "number of channels:",
  //     testSound.getNumberOfChannels(),
  //   )

  //   testSound.play((success) => {
  //     if (success) {
  //       alert("Hi there")
  //     }
  //   })
  // }

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

        <PlaySoundTest />

        {/* <Button style={MENU_BUTTONS} onPress={doTheThing}>
          <Text style={MENU_BUTTONS_TEXT}>TESTSOUND</Text>
        </Button> */}

        <View style={MENU_BUTTONS_CONTAINER}>
          <Button style={MENU_BUTTONS} onPress={goGameLibrary}>
            <Text style={MENU_BUTTONS_TEXT}>PLAY</Text>
          </Button>

          <Button style={MENU_BUTTONS} onPress={goChooseDifficultyAndTitle}>
            <Text style={MENU_BUTTONS_TEXT}>CREATE GAME</Text>
          </Button>

          <Button style={HOW_TO_PLAY_MENU_BUTTON}>
            <Text style={HOW_TO_PLAY_MENU_BUTTON_TEXT}>HOW TO PLAY</Text>
          </Button>
        </View>

        {/* FOR DEVVING */}

        <Text style={SIGNUP_REDIRECT_TEXT}>
          <Text style={SIGNUP_REDIRECT_LINK} onPress={resetEverything}>
            Delete all games and data (DEBUG)
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

// on create game, how do I start capturing data from screen to screen, eventually creating one object or "game"?
// on create game, make new thing
