<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1.0
seed 0


giSin ftgen 1, 0, 8192, 10, 1

turnon "reverb"

instr 100
  turnoff2 "metro",0,0
endin  

instr metro
  ktrig metro (60/60)
  if (ktrig == 1) then
    event "i", "sine", 0, 4.0
  endif    
endin  

instr sine
  iattks[] fillarray 0.001, 0.5, 0.9
  iattk =  iattks[rnd(lenarray(iattks))]
  inotes[] fillarray 48,52,55,59,60,64,67,71
  
  kenv linseg 0.0, p3*iattk, 0.1, p3*(1-iattk), 0.0
  asig oscil kenv, cpsmidinn(inotes[random:i(0, lenarray(inotes))]),  giSin
  al, ar pan2 asig, rnd(1.0)

  outs asig, asig
  chnmix al*0.2, "reverbL"
  chnmix ar*0.2, "reverbR"    
endin


instr reverb
  al, ar reverbsc chnget:a("reverbL"), chnget:a("reverbR"), 0.85, 12000
  outs al, ar  
  chnclear "reverbL"
  chnclear "reverbR"    
endin

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>


