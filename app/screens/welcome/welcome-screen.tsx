import React from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  // center text to middle of screen
  flex: 1,
  justifyContent: "center",
  alignContent: "center",
  // borderWidth: 3,
  // borderColor: "red"
}
const TEXT: TextStyle = {
  color: color.palette.darkBlue,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 36,
  lineHeight: 38,
  backgroundColor: color.transparent,
}

// const CONTENT: TextStyle = {
//   ...TEXT,
//   color: "#BAB6C8",
//   fontSize: 15,
//   lineHeight: 22,
// }
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.transparent,
  borderWidth: 2,
  borderRadius: 6,
  borderColor: color.palette.darkBlue,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: color.transparent }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[6],
  paddingHorizontal: spacing[5],
}

export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate("login")

  return (
    <View testID="WelcomeScreen" style={FULL}>
      {/* <Wallpaper /> */}
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        {/* <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} /> */}
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="SoundFave" />
        </Text>

        {/* <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" /> */}
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="welcomeScreen.continue"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
})
