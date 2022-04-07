function retval = getImpulseResponse (G)
  t = 0:0.01:0.5
  
  impulse(G,t)
  retval = impulse(G);
endfunction