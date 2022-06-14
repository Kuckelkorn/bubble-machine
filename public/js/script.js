
import updateGraph from './D3-graph.js'
import { fetchDataFromAPI } from './modules/apiData.js'
import { createSession } from './modules/createSession.js'
import { resetSession } from './modules/resetSession.js'
import { nextStep } from './modules/updateSession.js'
import { autoPlay } from './modules/playSession.js'
import { dropdown } from './modules/dropdown.js'

const sessionID = 4

const menu = document.querySelector('section')
const dropdownBtn = document.querySelector("#parameterBtn")
const accordionButton =  document.querySelector('section ul li img')
const resetBtn = document.querySelector('#resetSimulation')
const nextBtn = document.querySelector('#nextStep')
// const sessionBtn = document.querySelector('#makeSession')
const autoBtn = document.querySelector('#autoPlay')



// Initial display of graph
const data = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);
updateGraph(await data)


// Buttons

nextBtn.addEventListener('click', () => nextStep(sessionID))
resetBtn.addEventListener('click', () => resetSession(sessionID))
// sessionBtn.addEventListener('click', createSession)
autoBtn.addEventListener('click', () => autoPlay(sessionID))
dropdownBtn.addEventListener('click', dropdown)

// Function to download svg image
function downloadSVG(){

  // //get svg element.
  const svg2 = document.querySelector("svg");
  
  //get svg source.
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg2);
  
  //add name spaces.
  if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }
  
  //add xml declaration
  source = '<?xml-stylesheet href="https://bubble-machine.herokuapp.com/css/style.css" version="1.0" standalone="no"?>\r\n' + source;
  
  //convert svg source to URI data scheme.
  const url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
  
  // make from button a download svg button
  document.getElementById("downloadSVG").setAttribute("href", url);
  document.getElementById("downloadSVG").setAttribute("download", "test.svg");
  
  }
  
  // When clicking on downloadSVG button download svg
  document.querySelector("#downloadSVG").addEventListener('click', (e) => {
    downloadSVG()
  }, false);
  
  // bron https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
  
  
    
  