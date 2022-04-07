function retval = getStepResponse (G)
  t = 0:0.01:0.5;
  retval = step(G, t);
endfunction