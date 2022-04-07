function retval = getOpenLoopTransferFunction (kt, ke, J, b)
  pkg load control;
  
  R = 0.06727;
  L = 0.001882;
  
  s = tf('s');
  
  numerator = kt;
  
  denominator = L*J*s^3 + L*b*s^2 + R * J * s^2 + R*b*s + kt*ke*s;
  
  retval = numerator/denominator;
  
  
endfunction
