export default class SicrediError extends Error {
  constructor (error) {
    super()
    this.error = error
  }
}
