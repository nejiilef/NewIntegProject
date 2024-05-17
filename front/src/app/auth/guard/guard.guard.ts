import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isAuthenticated()){
    if(route.url[0]!=undefined){
    if((localStorage.getItem("role")=="chef" && route.url[0].path=="dash") || (localStorage.getItem("role")=="responsable" && route.url[0].path=="respo")){
return true;
    }else if(route.url[0].path!="dash" && route.url[0].path!="respo"){
      return true
      
    }else{
      router.navigate(['/auth/login']);
  return false;}
  
}else{
  return true;
}
}else{
  router.navigate(['/auth/login']);
  return false;
}
};
