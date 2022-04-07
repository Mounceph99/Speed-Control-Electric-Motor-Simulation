function retval = getStepResponse (G, maxTime)
  t = 0:0.01:maxTime;
  retval = step(G, t);
endfunction