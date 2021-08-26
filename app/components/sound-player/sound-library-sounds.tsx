import Sound from "react-native-sound"

export class ResolvableSound {
  private sound?: Sound
  private promise?: Promise<void>
  
  constructor(private file: string, private bundle = Sound.MAIN_BUNDLE) {}
  

  async play(): Promise<void>{

    let p = Promise.resolve()
    if( !this.sound ){
      p = this.loadSound()
    }
    
    return p.then( () => {
      return new Promise( (resolve, reject) => {
        this.sound.play( success => {
          success ? resolve() : reject(new Error('Failed to play sound ' + this.file)) 
        })
      })
    })
  }

  async loadSound(){
    this.promise = new Promise( (resolve, reject) => {
      console.log('here we go?')
      this.sound = new Sound(this.file, this.bundle, (err) => {
        if( err && err !== null ){
          reject(err)
        }else{
          console.log('loaded sound file!', this.file)
          resolve()
        }
      })
    })
    return this.promise
  }
}

export const COW_NAME = new ResolvableSound("TTS_COW.mp3")
export const COW_SOUND = new ResolvableSound("catMeow.mp3")
