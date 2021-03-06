import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const SoundMatchPairModel = types.model("SoundMatchPair").props({
  id: types.identifier,
  questionText: types.string,
  questionSound: types.maybeNull(types.string),
  answerText: types.string,
  answerSound: types.maybeNull(types.string),
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
