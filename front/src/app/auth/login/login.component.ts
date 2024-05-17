import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',"../../../assets/css/style.min.css"]
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  
  submitForm() {
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response.jwt != null) {
          localStorage.setItem("role",response.role);
          console.log(response.role);
          alert("Hello, Your token is " + response.jwt);
          const jwtToken = response.jwt;
          localStorage.setItem('jwt', jwtToken);
          localStorage.setItem('username', this.loginForm.value.username);
          if(localStorage.getItem("role")=="chef"){
          this.router.navigateByUrl("/dash");
        }else if(localStorage.getItem("role")=="responsable"){
          this.router.navigateByUrl("respo");
        }else{
          this.router.navigateByUrl("material");
        }
      }},
      (error)=>{
        alert("Email ou mot de passe incorrect ! " );
      }
      )
    
  }
}
