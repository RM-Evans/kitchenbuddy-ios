import React, { useState } from "react"
//TextInput HOC?
import { View, ViewStyle, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"
import { palette } from "../../theme/palette"
import { DummyModal } from "./dummy-modal"

const BOLD: TextStyle = { fontWeight: "bold" }
const PRIMARYTEXTCOLOR: TextStyle = { color: color.palette.darkBlue }
const TEXT: TextStyle = {
  ...PRIMARYTEXTCOLOR,
  fontFamily: typography.primary,
}

const MATCH_ASSIGN_BUTTONS_CONTAINER: ViewStyle = {
  flex: 10,
  justifyContent: "center",
  flexDirection: "row",

  paddingBottom: 50,
}

const MATCH_ASSIGN_BUTTONS: ViewStyle = {
  marginHorizontal: spacing[3],
  paddingVertical: spacing[2],
  marginTop: 30,
  borderRadius: 20,
  height: 75,
  width: 115,

  backgroundColor: color.palette.skyBlue,
  borderWidth: 2,
  borderColor: color.palette.darkBlue,
}

const MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.palette.offWhite,
  fontSize: 20,
}

export const DummyRow = observer(function DummyRow() {
  const [modalVisible, setModalVisible] = useState(false)
  const [buttonOneObject, setButtonOneObject] = useState<any>(null)
  const dummyModalClosed = (item: any) => {
    setModalVisible(false)
    setButtonOneObject(item)
  }

  return (
    <View>
      <View style={MATCH_ASSIGN_BUTTONS_CONTAINER}>
        <Button style={MATCH_ASSIGN_BUTTONS} onPress={() => setModalVisible(true)}>
          <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>
            {buttonOneObject ? buttonOneObject.title : "sound"}
          </Text>
        </Button>

        <Button style={MATCH_ASSIGN_BUTTONS} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>match</Text>
        </Button>
      </View>
      {/* my modal component */}
      {modalVisible ? <DummyModal closeModal={dummyModalClosed} /> : null}
    </View>
  )
})
