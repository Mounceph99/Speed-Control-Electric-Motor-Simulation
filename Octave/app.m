function retval = app(kt, ke, J, b, kp, ki, kd)
 pkg load control;
  
 G = getOpenLoopTransferFunction(kt, ke, J, b); 
 PIDG = createPID(kp,ki,kd,G)  
 retval = getStepResponse(PIDG);
 
endfunction