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
turnon "delay"

instr 100
  turnoff3 p4  
endin  

instr 101
  kenv linseg 0.0, p3 * 0.2, 0.2, p3*0.6, 0.2, p3*0.2, 0.0
  asig oscil kenv, p4, giSin
  outs asig, asig   
endin  

instr 102
  kenv linseg 0.0, p3 * 0.2, 0.05, p3*0.6, 0.05, p3*0.2, 0.0
  kindx linseg 1.0, p3 * 0.4, 3.0, p3*0.4, 1.5, p3*0.2, 1.0
  asig foscil kenv, p4, 1, 4, kindx, giSin
  asig2 foscil kenv, p4, 1, 14.0, kindx * 0.4, giSin
  asig = (asig + asig2) * 0.5
  al,ar pan2 asig, rnd(1.0)  
  outs al,ar
  chnmix asig * 0.6, "reverb"
  chnmix asig * 0.3, "delay"      
endin  


instr reverb
  amix chnget "reverb"
  aL, aR reverbsc amix, amix, 0.85, 12000, sr, 0.5, 1
  outs aL, aR
  chnclear "reverb"  
endin

instr delay
  amix chnget "delay"
  al comb amix, 4.0, 0.25
  ar comb amix, 4.0, 0.27
  outs al, ar
  chnclear "delay"  
endin  

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>

