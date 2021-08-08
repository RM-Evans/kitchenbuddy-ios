import { Instance, SnapshotOut, types } from "mobx-state-tree"
// import { CharacterModel, CharacterSnapshot } from "../character/character"
// import { CharacterApi } from "../../services/api/character-api"
// import { withEnvironment } from "../extensions/with-environment"

import { SoundMatchGameModel } from "./sound-match-game"
/**
 * Example store containing Rick and Morty characters
 */
export const SoundMatchStoreModel = types
  .model("SoundMatchStore")
  .props({
    games: types.optional(types.array(SoundMatchGameModel), []),
  })
  // .extend(withEnvironment)
  .actions((self) => ({
    // saveCharacters: (characterSnapshots: CharacterSnapshot[]) => {
    //   self.characters.replace(characterSnapshots)
    // },
  }))
  .actions((self) => ({
    // getCharacters: async () => {
    //   const characterApi = new CharacterApi(self.environment.api)
    //   const result = await characterApi.getCharacters()

    //   if (result.kind === "ok") {
    //     self.saveCharacters(result.characters)
    //   } else {
    //     __DEV__ && console.tron.log(result.kind)
    //   }
    // },
  }))

type SoundMatchStoreType = Instance<typeof SoundMatchStoreModel>
export interface SoundMatchStore extends SoundMatchStoreType {}
type SoundMatchStoreSnapshotType = SnapshotOut<typeof SoundMatchStoreModel>
export interface SoundMatchStoreSnapshot extends SoundMatchStoreSnapshotType {}
export const createSoundMatchStoreDefaultModel = () => types.optional(SoundMatchStoreModel, {})
