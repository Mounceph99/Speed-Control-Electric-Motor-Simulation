function retval = createPID (kp, ki, kd, G)
 pkg load control;
  
 C = pid(kp, ki, kp);
 
 T = feedback(C*G, 1); 
  
 retval = T;
 
endfunction