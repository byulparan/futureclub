// https://developer.mozilla.org/ko/docs/Web/API/Web_Audio_API

let ctx = false;

function init() {
  if(!ctx) {
    ctx = new AudioContext();
    ctx.resume();
  }
}

function mtof(note) {
  let a = 440; 
  return (a / 32) * (2 ** ((note - 9) / 12));
}




document.querySelector('#run')
  .addEventListener('click', e => {
    init();

  })
