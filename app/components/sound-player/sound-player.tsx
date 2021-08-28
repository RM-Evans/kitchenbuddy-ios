import * as React from "react"
import { View, TouchableOpacity } from "react-native"
// import { Button } from "../button/button"
// import { Text } from "../text/text"
import { COW_NAME, COW_SOUND, ResolvableSound } from "./sound-library-sounds"
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

export type PlaySoundTestProps = {
  item: any
}
export function PlaySoundTest(props: PlaySoundTestProps) {
  const playTheSound = async () => {
    const sound = new ResolvableSound(props.item.soundFile)
    sound
      .play()
      .then((e) => {
        console.log("success on " + props.item.soundFile)
      })
      .catch((err) => {
        console.warn("failed on", props.item, err)
      })

    // alert("nope")
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
  )

  //FlatListPlay
}
