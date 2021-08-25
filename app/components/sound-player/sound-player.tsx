import * as React from "react"
import { View, TouchableOpacity } from "react-native"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { COW_NAME, COW_SOUND, GOOSE_SOUND } from "./sound-library-sounds"
// @ts-ignore
import DoThing from "../../../assets/DoThing.svg"
import { palette } from "../../theme/palette"

// interface playButtonStyleprops {
//   style: any
// }

const PLAY_BUTTON = {
  width: 35,
  height: 35,
  // borderColor: palette.angry,
  // borderWidth: 2,
  // borderStyle: "solid",
}

export function PlaySoundTest() {
  const playTheSound = () => {
    COW_NAME.play((success) => {
      if (!success) {
        alert("Hi there")
      }
    })

    alert("nope")
  }

  function FlatListPlay() {
    return (
      <TouchableOpacity
        onPress={playTheSound}
        // style={{
        //   borderColor: palette.angry,
        //   borderWidth: 2,
        //   borderStyle: "solid",
        // }}
      >
        <DoThing onPress={playTheSound} style={PLAY_BUTTON} />
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <FlatListPlay />
    </View>

    // <Button onPress={playTheSound} style={{ height: 30, width: 30 }}>
    //   <Text>Play</Text>
    // </Button>
  )

  //FlatListPlay
}
