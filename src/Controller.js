import Dordle from './Dordle'
import Quordle from './Quordle'
import Wordle from './Wordle'

function Controller() {

  const params = new URLSearchParams(window.location.search)

  return <Quordle />

  if (params.get('dordle')) {
    return <Dordle />
  }

  return <Wordle />

}

export default Controller
