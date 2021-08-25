import * as React from "react"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { COW_NAME, COW_SOUND } from "./sound-library-sounds"

export function PlaySoundTest() {
  const playTheSound = async () => {
    COW_NAME.play().then(e => {
      console.log('success on demo')
    }).catch(err => {
      console.warn('failed', err)
    })
  }

  return (
    <Button onPress={playTheSound} style={{ height: 30, width: 30 }}>
      <Text>Play </Text>
    </Button>
  )
}
