import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AudioModel } from "../audio/audio-store"


export const SoundMatchPairModel = types.model("SoundMatchPair").props({
  id: types.identifier,
  question: types.reference(AudioModel),
  answer: types.reference(AudioModel),
})

export const SoundMatchGameModel = types.model("SoundMatchGame").props({
  id: types.identifier,
  title: types.string,
  pairs: types.array(types.reference(SoundMatchPairModel)),
})

type SoundMatchPairType = Instance<typeof SoundMatchPairModel>
export interface SoundMatchPair extends SoundMatchPairType {}
type SoundMatchPairSnapshotType = SnapshotOut<typeof SoundMatchPairModel>
export interface SoundMatchPairSnapshot extends SoundMatchPairSnapshotType {}
export const createSoundMatchPairDefaultModel = () => types.optional(SoundMatchPairModel, {})

type SoundMatchGameType = Instance<typeof SoundMatchGameModel>
export interface SoundMatchGame extends SoundMatchGameType {}
type SoundMatchGameSnapshotType = SnapshotOut<typeof SoundMatchGameModel>
export interface SoundMatchGameSnapshot extends SoundMatchGameSnapshotType {}
export const createSoundMatchGameDefaultModel = () => types.optional(SoundMatchGameModel, {})
