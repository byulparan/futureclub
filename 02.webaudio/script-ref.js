// https://developer.mozilla.org/ko/docs/Web/API/Web_Audio_API

let ctx = false;
let running = false;
let filter;
let timer;

function init() {
  if(!ctx) {
    ctx = new AudioContext();

    filter = ctx.createBiquadFilter();
    filter.type= 'lowpaass';
    filter.frequency.value = 440;

    filter.connect(ctx.destination);
    
    ctx.resume();
  }

  if(!running) {
    makePad();
    timer = setInterval(() => {
      makePad();
    }, 8000);
    running = true;
  } else {
    clearInterval(timer);
    running = false;
  }
}

function mtof(note) {
  let a = 440; 
  return (a / 32) * (2 ** ((note - 9) / 12));
}

function synth(freq) {
  let now = ctx.currentTime;
  
  let osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = freq;

  let env = ctx.createGain();
  
  env.gain.linearRampToValueAtTime(0.0, now);
  env.gain.linearRampToValueAtTime(0.2, now + 2.0);
  env.gain.linearRampToValueAtTime(0.2, now + 4.0);
  env.gain.linearRampToValueAtTime(0.0, now + 10.0);
  osc.connect(env);
  env.connect(filter);
  
  osc.start(now);
  osc.stop(now + 10.0);
}

function makePad() {
  synth(mtof(48));
  synth(mtof(55));
  synth(mtof(59));
  let notes = [60,67,71,74,79];
  let note = notes[Math.floor(Math.random() * notes.length)];
  synth(mtof(note));
}



document.querySelector('#run')
  .addEventListener('click', e => {

    init();

  })

document.querySelector('#cutoff')
  .addEventListener('input', e => {
    if(ctx) {
      filter.frequency.value = e.target.value;
    }
  })
