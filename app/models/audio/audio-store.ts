import { v4 as UUID } from "uuid"
import { getSnapshot, Instance, SnapshotOut, types, destroy } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"



export const AudioModel = types.model("Audio").props({
    id: types.identifier,
    remoteId: types.maybeNull(types.number),
    path: types.string,
    title: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    ordinal: types.maybeNull(types.number),
    createdOn: types.Date,
})



export const AudioStoreModel = types
  .model("AudioStore")
  .props({
    sounds: types.optional(types.array(AudioModel), []),
  })
  .extend(withEnvironment)
  
  .views(self => ({
    get allSounds(){
      return self.sounds
    }
  }))
  .actions((self) => ({

    __removeSound: async (id: string) => {
      const found = self.sounds.find(s => s.id === id)
      if( found ){
        const removed = self.sounds.remove(found)
        console.log('removed', id, removed)
        return found
      }
      return undefined
    }
  }))
  .actions((self) => ({
    createSound: (id: string, title: string, path: string, ordinal?: number) => {

      if( !ordinal ){
        // get the highest number OR the length of the array + 1
        ordinal = self.sounds.reduce( (c, n) => Math.max(c, n.ordinal), 0) + 1
        ordinal = Math.max(self.sounds.length + 1, ordinal)
      }
      
      const audio = AudioModel.create({
        id,
        path,
        title,
        ordinal,
        createdOn: new Date()
      })
      console.log("created audio", id, path)
      self.sounds.push(audio)
      self.sounds.sort( (a, b) => a.ordinal - b.ordinal )
      return audio
    },
    deleteSound: async (id: string) => {
      const found = await self.__removeSound(id)
      if( found ){
        console.log('deleting', id, found)
        destroy(found)
        console.log('deleted')
        return true
      }
      return false
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

type AudioStoreType = Instance<typeof AudioStoreModel>
export interface AudioStore extends AudioStoreType {}
type AudioStoreSnapshotType = SnapshotOut<typeof AudioStoreModel>
export interface AudioStoreSnapshot extends AudioStoreSnapshotType {}
export const createAudioStoreDefaultModel = () => types.optional(AudioStoreModel, {})
