import { v4 as UUID } from "uuid"
import { getSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
// import { CharacterModel, CharacterSnapshot } from "../character/character"
// import { CharacterApi } from "../../services/api/character-api"
import { withEnvironment } from "../extensions/with-environment"

import {
  SoundMatchGameModel,
  SoundMatchPairModel,
  SoundMatchGameSnapshot,
  SoundMatchPairSnapshot,
  SoundMatchPair,
} from "./sound-match-game"
/**
 * Example store containing Rick and Morty characters
 */

export type SoundMatchPairs = { questionText: string; answerText: string }[]

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
    createGame: (title: string, pairings: SoundMatchPairs) => {
      console.log("create the game", title, pairings)
      const pairs = self.pairs || []
      const newPairs = []
      for (let p of pairings) {
        const id = UUID()
        const pair = SoundMatchPairModel.create({ id, ...p })
        pairs.push(pair)
        newPairs.push(pair)
        console.log("created pair", id, p, pair)
      }

      self.pairs.replace(pairs)
      const id = UUID()
      const game = SoundMatchGameModel.create({
        id,
        title,
        pairs: newPairs.map((p) => p.id),
      })
      console.log("created game", id)
      self.games.push(game)
    },
    getGame: (id: string) => {
      const game = self.games.find((e) => e.id === id)
      return game
    },
    deleteEverything: () => {
      self.games.replace([])
      self.pairs.replace([])
    },
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
