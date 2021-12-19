import React from "react"
 
import { TextStyle, View, ViewStyle } from "react-native"
import { Header, Screen } from "../../components"
import AudioLibrary from "../../components/audio-library/audio-library"
import { color, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"



const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.primaryBackground,
  paddingHorizontal: spacing[4],
}
const HEADER: TextStyle = {
  color: color.palette.black,

  paddingTop: spacing[5],
  paddingBottom: spacing[2] - 2,
  paddingHorizontal: 0,
}



export const AudioScreen = function AudioScreen(){
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  return (
    <View testID="GeneratedGameScreen" style={FULL}>
      <Header leftIcon="back" onLeftPress={goBack} style={HEADER} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <AudioLibrary controls={{ add: true, select: false, delete: true }}/>
      </Screen>
    </View>
  )
}