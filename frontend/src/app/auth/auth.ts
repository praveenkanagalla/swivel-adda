import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  isLoginMode = true;

  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '' };

  constructor(private http: HttpClient, private router: Router) { }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.http.post('http://localhost:5000/login', this.loginData).subscribe(
      (res: any) => {
        if (res.success) {

        } else {
          alert(res.message);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        alert(error.error.message || 'Login failed.');
      }
    );
  }



  onRegister(form: NgForm) {
    if (form.invalid) return;

    console.log('Submitting registerData:', this.registerData);

    this.http.post('http://localhost:5000/register', this.registerData).subscribe(
      (res: any) => {
        alert(res.message);

        localStorage.setItem('user', JSON.stringify({
          username: this.registerData.name,
          email: this.registerData.email,
          password: this.registerData.password
          // token: res.token
        }));

        console.log('Data saved to localStorage');
      },
      err => {
        console.error('Error occurred:', err);
        alert(err.error.message);
      }
    );
  }

}
