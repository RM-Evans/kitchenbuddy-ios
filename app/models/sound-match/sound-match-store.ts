import { getSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
// import { CharacterModel, CharacterSnapshot } from "../character/character"
// import { CharacterApi } from "../../services/api/character-api"
import { withEnvironment } from "../extensions/with-environment"

import { SoundMatchGameModel, SoundMatchPairModel, SoundMatchGameSnapshot, SoundMatchPairSnapshot, SoundMatchPair } from "./sound-match-game"
/**
 * Example store containing Rick and Morty characters
 */

export type SoundMatchPairs = {questionText: string, answerText: string}[]

let idx = 1

export const SoundMatchStoreModel = types
  .model("SoundMatchStore")
  .props({
    games: types.optional(types.array(SoundMatchGameModel), []),
    pairs: types.optional(types.array(SoundMatchPairModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    // saveCharacters: (snapshots: SoundMatchGameSnapshot[]) => {
    //   self.games.replace(snapshots)
    // },
  }))
  .actions((self) => ({
    createGame: (title: string, pairings: SoundMatchPairs ) => {
      console.log('create the game', title, pairings)
      const pairs = pairings.map(p => SoundMatchPairModel.create({ id: idx++, ...p }).id)
      self.pairs.concat(self.pairs, pairs)
      const game = SoundMatchGameModel.create({ id: idx++, title, pairs })
      self.games.push(game)
    },
    getGame: (id: number) => {
      const game = self.games.find(e => e.id === id)
      return game
    },
    deleteEverything: () => {
      self.games.replace([])
      self.pairs.replace([])
    }
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
