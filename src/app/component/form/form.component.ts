import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {TokenService} from "../../service/token.service";
import {AccountService} from "../../service/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    HttpClientModule,
    JsonPipe

  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  form: FormGroup;
  errorAuth : string = "" ;


  constructor(private fb: FormBuilder ,
              private loginService: LoginService ,
              private tokenService: TokenService ,
              private accountService: AccountService ,
              private router: Router,
             ) {
    this.form = this.fb.group({
      nomColombie: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
    });
  }

  get nomColombie() {
    return this.form.get('nomColombie');
  }

  get password() {
    return this.form.get('password');
  }

  submit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      this.loginService.login(this.form.value).subscribe({
        next: (data) => this.loginService.handleResponse(data),
        error: (err : HttpErrorResponse) => {
          this.errorAuth = err.error?.message ;
          this.form.get('password')?.setValue("") ;
          //console.log('Error :', err.error?.message || 'Unknown error');
        },
      });

    } else {
      const error = [];
      if (!this.form.get("nomColombie")?.valid){
        error.push("Invalid nomColombie address")
      }
      if (!this.form.get("password")?.valid){
        error.push("Invalid password")
      }
      this.errorAuth = `${error}` ;
    }
  }



}
