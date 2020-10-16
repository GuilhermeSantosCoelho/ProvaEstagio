import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  loginInProccess: Boolean;
  error:string;
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.loginInProccess = false;
  }
  initForm(){
    this.formGroup = new FormGroup({
      usuario: new FormControl("", [Validators.required, Validators.minLength(3)]),
      senha: new FormControl("", [Validators.required, Validators.minLength(3)])
    })
  }

  getErrorMessage(errors) {
    if(errors.required){
      return "Preencha esse campo";
    }else if(errors.minlength){
      return "O campo precisa ter no mínimo " + errors.minlength.requiredLength + " caracteres.";
    }
  }
  
  login(){
    this.error = '';
    this.loginInProccess = true;
    setTimeout(()=>{
      this.loginInProccess = false;
    }, 3000);

    if(this.formGroup.valid){
      if(this.formGroup.value.usuario == 'concert' && this.formGroup.value.senha == 'prova'){
        this.router.navigate(['home'], { relativeTo: this.route });
      }else{
        this.error = 'Credenciais incorretas';
      }
    }
  }
}
