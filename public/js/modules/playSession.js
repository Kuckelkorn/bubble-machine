
import createDragGraph from '../D3-dragGraph.js'

import { fetchDataFromAPI } from './apiData.js'

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let play = false

export const autoPlay = async (sessionID) => {
  const counter = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
  play = !play
  for (let i = await counter.step; i <= 100; i++) {
    while (play === true) {
      fetchDataFromAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
      const data = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
      createDragGraph(await data)
      await wait(1000)
    }
  }
}
