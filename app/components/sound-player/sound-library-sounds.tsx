const Sound = require("react-native-sound")

export class ResolvableSound extends Sound {
  private resolve = (resolve: ResolvableSound) => unknown
  private reject = (err: unknown) => unknown

  public promise = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })
  constructor(file: string, bundle = Sound.MAIN_BUNDLE) {
    super(file, bundle, (error) => {
      if (error) {
        this.reject(error)
        return
      }
      this.resolve(this)
    })
  }
}

export const COW_NAME = new ResolvableSound("TTS_COW.mp3")
export const COW_SOUND = new ResolvableSound("cowMoo.mp3")
