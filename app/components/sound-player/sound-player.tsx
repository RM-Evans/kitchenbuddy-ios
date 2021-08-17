import * as React from "react"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { COW_NAME, COW_SOUND } from "./sound-library-sounds"

export function PlaySoundTest() {
  const doTheThing = () => {
    COW_NAME.play((success) => {
      if (!success) {
        alert("Hi there")
      }
    })
  }

  return (
    <Button onPress={doTheThing} style={{ height: 30, width: 30 }}>
      <Text>test my sounds</Text>
    </Button>
  )
}
