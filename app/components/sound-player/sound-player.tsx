import * as React from "react"
import { View, TouchableOpacity } from "react-native"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { COW_NAME, COW_SOUND, GOOSE_SOUND } from "./sound-library-sounds"
// @ts-ignore
import DoThing from "../../../assets/DoThing.svg"

const PLAY_BUTTON = {
  width: 25,
  height: 25,
}

export function PlaySoundTest() {
  const playTheSound = () => {
    alert("nope")
    COW_NAME.play((success) => {
      if (!success) {
        alert("Hi there")
      }
    })
  }

  function FlatListPlay() {
    return (
      <TouchableOpacity onPress={playTheSound}>
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
