
let csound = false;
let initialize = false;
let running = false;

async function init() {
  csound = new CsoundObj();
  csound.setMessageCallback(handleMessage);
  
  let text = await fetch('sound.csd');
  text = await text.text();
  csound.compileCSD(text);
}

CsoundObj.initialize().then(() => {
  init();
})



document.querySelector('#run')
  .addEventListener('click', e => {
    if(!initialize) {
      csound.audioContext.resume();
      csound.start();
      initialize = true;
    }
    
    if(!running) {
      let notes = [ 55, 60, 64, 67, 70, 72, 74];
      for(let i = 0; i < 10; i++) {
	let freq = mtof(notes[Math.floor(Math.random() * notes.length)]);
	csound.evaluateCode(`schedule 101, ${ i * 4 }, 8, ${freq}`);
      }
      running = true;
    } else {
      csound.evaluateCode('schedule 100, 0, 0.1, 101');
      running = false;
    }
  })



function mtof(note) {
  let a = 440; 
  return (a / 32) * (2 ** ((note - 9) / 12));
}


let count = 0;
function handleMessage(message) {
  let element = document.getElementById('console');
  element.appendChild(document.createTextNode(' ' + message));
  element.appendChild(document.createElementNS("http://www.w3.org/1999/xhtml", "br"));

  element.scrollTop = 99999; // focus on bottom
  count += 1;
  if (count == 1000) {
    element.textNode = ' ';
    count = 0;
  }
}
