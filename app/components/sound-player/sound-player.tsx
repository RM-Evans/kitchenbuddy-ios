import * as React from "react"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { COW_NAME, COW_SOUND } from "./sound-library-sounds"

export function PlaySoundTest() {
  const playTheSound = () => {
    alert('nope')
    COW_NAME.play((success) => {
      if (!success) {
        alert("Hi there")
      }
    })
  }

  return (
    <Button onPress={playTheSound} style={{ height: 30, width: 30 }}>
      <Text>Play</Text>
    </Button>
  )
}
