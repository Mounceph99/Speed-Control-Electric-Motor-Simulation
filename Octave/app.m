function retval = app(kt, ke, J, b, kp, ki, kd, maxTime)
 pkg load control;
  
 G = getOpenLoopTransferFunction(kt, ke, J, b); 
 PIDG = createPID(kp,ki,kd,G)  
 retval = getStepResponse(PIDG, maxTime);
 
endfunction