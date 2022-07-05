
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
      csound.evaluateCode('schedule "metro", 0, -1');
      running = true;
    } else {
      csound.evaluateCode('schedule 100, 0, 0.1');
      running = false;
    }
  })





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
