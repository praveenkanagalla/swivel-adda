import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'] // 🔧 Corrected this
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
          const user = {
            name: res.user.name,
            email: res.user.email
          };
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        } else {
          alert(res.message);
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert(error.error?.message || 'Login failed.');
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
          name: this.registerData.name,
          email: this.registerData.email
        }));

        // Optional: redirect after register
        this.toggleMode(); // go back to login form
      },
      err => {
        console.error('Register error:', err);
        alert(err.error?.message || 'Registration failed.');
      }
    );
  }
}
