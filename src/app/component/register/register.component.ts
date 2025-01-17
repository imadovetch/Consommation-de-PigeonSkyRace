import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { TokenService } from '../../service/token.service';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  errorAuth: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private tokenService: TokenService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nomColombie: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get nomColombie() {
    return this.form.get('nomColombie');
  }

  get username() {
    return this.form.get('username');
  }

  get latitude() {
    return this.form.get('latitude');
  }

  get longitude() {
    return this.form.get('longitude');
  }

  get password() {
    return this.form.get('password');
  }

  submit() {
    if (this.form.valid) {
      const formData = {
        nomColombie: this.form.value.nomColombie,
        password: this.form.value.password,
        username: this.form.value.username,
        latitude: this.form.value.latitude,
        longitude: this.form.value.longitude,
      };

      this.loginService.register(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.loginService.handleResponse(response)
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.errorAuth = error.message || 'An error occurred during registration';
        },
      });
    }
  }

}
