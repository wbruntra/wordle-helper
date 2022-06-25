import Dordle from './Dordle'
import Wordle from './Wordle'

function Controller() {

  const params = new URLSearchParams(window.location.search)

  return <Dordle />

  if (params.get('dordle')) {
    return <Dordle />
  }

  return <Wordle />

}

export default Controller
