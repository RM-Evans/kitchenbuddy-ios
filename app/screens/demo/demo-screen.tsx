import React from "react"
import { ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import {
  BulletItem,
  Button,
  Header,
  Text,
  Screen,
  Wallpaper,
  AutoImage as Image,
} from "../../components"
import { color, spacing } from "../../theme"
import { Api } from "../../services/api"
import { save } from "../../utils/storage"

export const mcup = require("./mcup.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
// const DEMO: ViewStyle = {
//   paddingVertical: spacing[4],
//   paddingHorizontal: spacing[4],
//   backgroundColor: color.palette.deepPurple,
// }

const TOOLBTN: ViewStyle = {
  height: 250,
  width: 250,
  borderRadius: 25,
}
const TOOLBTNIMG: ViewStyle = {
  height: 200,
  width: 200,
}

const BOLD: TextStyle = { fontWeight: "bold" }
const PRIMARYTEXTCOLOR: TextStyle = { color: color.palette.darkBlue }
// const DEMO_TEXT: TextStyle = {
//   ...BOLD,
//   ...PRIMARYTEXTCOLOR,
//   fontSize: 13,
//   letterSpacing: 2,
// }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  ...PRIMARYTEXTCOLOR,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...BOLD,
  ...PRIMARYTEXTCOLOR,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const TAGLINE: TextStyle = {
  ...PRIMARYTEXTCOLOR,
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}

const HINT: TextStyle = {
  ...PRIMARYTEXTCOLOR,
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
}

// const platformCommand = Platform.select({
//   ios: "Cmd + D",
//   android: "Cmd/Ctrl + M",
// })

export const DemoScreen = observer(function DemoScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  // const demoReactotron = React.useMemo(
  //   () => async () => {
  //     console.tron.log("Your Friendly tron log message")
  //     console.tron.logImportant("I am important")
  //     console.tron.display({
  //       name: "DISPLAY",
  //       value: {
  //         numbers: 1,
  //         strings: "strings",
  //         booleans: true,
  //         arrays: [1, 2, 3],
  //         objects: {
  //           deeper: {
  //             deeper: {
  //               yay: "👾",
  //             },
  //           },
  //         },
  //         functionNames: function hello() {
  //           /* dummy function */
  //         },
  //       },
  //       preview: "More control with display()",
  //       important: true,
  //       image: {
  //         uri:
  //           "https://avatars2.githubusercontent.com/u/3902527?s=200&u=a0d16b13ed719f35d95ca0f4440f5d07c32c349a&v=4",
  //       },
  //     })
  //     // make an API call for the demo
  //     // Don't do API like this, use store's API
  //     const demo = new Api()
  //     demo.setup()
  //     demo.getUser("1")
  //     // Let's do some async storage stuff
  //     await save("Cool Name", "Boaty McBoatface")
  //   },
  //   [],
  // )

  return (
    <View testID="DemoScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="demoScreen.howTo"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <Text style={TITLE} preset="header" tx="demoScreen.title" />
        <Text style={TAGLINE} tx="demoScreen.tagLine" />
        <Button style={TOOLBTN}>
          <Image source={mcup} style={TOOLBTNIMG} />
        </Button>

        <View>
          {/* <Button
            style={DEMO}
            textStyle={DEMO_TEXT}
            tx="demoScreen.reactotron"
            onPress={demoReactotron}
          /> */}
          <Text style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint` as const} />
        </View>
        {/* <Button
          style={DEMO}
          textStyle={DEMO_TEXT}
          tx="demoScreen.demoList"
          onPress={() => navigation.navigate("demoList")}
        /> */}
      </Screen>
    </View>
  )
})
