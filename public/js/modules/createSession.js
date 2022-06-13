
import { fetchDataFromAPI } from './apiData.js'

export const createSession = async () => {
  const sessionUl = document.querySelector('header > ul')
  const sessionId = await fetchDataFromAPI('POST', 'https://bubble-machine-api-dummy.herokuapp.com/rest/session')
  const newSession = document.createElement('li')
  const sessionNumber = document.createTextNode(`Session: ${await sessionId.sessionId}`)
  newSession.appendChild(sessionNumber)
  newSession.setAttribute('class', sessionId.sessionId)

  const newButton = document.createElement('button')
  const buttonText = document.createTextNode('X')
  newButton.appendChild(buttonText)
  newButton.setAttribute('class', sessionId.sessionId)
  newSession.appendChild(newButton)
  sessionUl.insertAdjacentElement('beforeend', newSession)
}
