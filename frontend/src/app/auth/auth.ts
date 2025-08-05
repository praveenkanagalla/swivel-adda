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

    this.http.post('http://localhost:5000/login', this.loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.name);
        localStorage.setItem('email', res.email);

        // Navigate to home/dashboard after login
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert(err.error.message || 'Login failed');
      }
    });
  }

  onRegister(form: NgForm) {
    if (form.invalid) return;

    this.http.post('http://localhost:5000/register', this.registerData).subscribe({
      next: (res: any) => {
        alert(res.message || 'Registration successful');

        // Optional: Switch to login mode after successful registration
        this.toggleMode();

        // Clear form
        this.registerData = { name: '', email: '', password: '' };
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert(err.error.message || 'Registration failed');
      }
    });
  }
}
