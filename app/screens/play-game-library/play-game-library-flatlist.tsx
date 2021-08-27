import React, { useState } from "react"
// TextInput HOC?
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

const GAME_LIBRARY_PAGE_TITLE_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",

  borderColor: color.palette.angry,
  borderWidth: 2,

  paddingHorizontal: spacing[6],
  paddingBottom: 20,
}

const GAME_LIBRARY_PAGE_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 32,
}

export const GameLibraryList = observer(function GameLibraryList() {
  const navigation = useNavigation()

  return (
    <View testID="GameLibraryList" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <View style={GAME_LIBRARY_PAGE_TITLE_CONTAINER}>
          <Text style={GAME_LIBRARY_PAGE_TITLE}>Game Library</Text>
        </View>
      </Screen>
    </View>
  )
})
