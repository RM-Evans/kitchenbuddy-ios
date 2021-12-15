import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AudioStoreModel } from "../audio/audio-store"
import { CharacterStoreModel } from "../character-store/character-store"
import { SoundMatchStoreModel } from "../sound-match/sound-match-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  audioStore: types.optional(AudioStoreModel, {} as any),
  characterStore: types.optional(CharacterStoreModel, {} as any),
  soundMatchStore: types.optional(SoundMatchStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
