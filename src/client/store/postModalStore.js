class PostModalStore {
  constructor () {
    this.state = {
      isOpened: false
    }
  }

  open () {
    this.state.isOpened = true
  }

  close () {
    this.state.isOpened = false
  }
}

export default new PostModalStore()
