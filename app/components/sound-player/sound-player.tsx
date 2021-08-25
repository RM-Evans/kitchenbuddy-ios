import * as React from "react"
import { View, TouchableOpacity } from "react-native"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { COW_NAME, COW_SOUND } from "./sound-library-sounds"
// @ts-ignore
import DoThing from "../../../assets/DoThing.svg"

const PLAY_BUTTON = {
  width: 25,
  height: 25,
}

export function PlaySoundTest() {
  const playTheSound = async () => {
    COW_NAME.play().then(e => {
      console.log('success on demo')
    }).catch(err => {
      console.warn('failed', err)
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
  )

  //FlatListPlay
}
