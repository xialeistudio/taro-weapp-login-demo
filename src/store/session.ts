import { observable } from 'mobx'

const session = observable({
  user: null,
  logged (user) {
    this.user = user
  },
  logout () {
    this.user = null
  }
})
export default session
