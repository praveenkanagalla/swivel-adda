import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Correct environment import
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);

  isLoginMode = true;

  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '' };

  private api = environment.apiUrl;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.http.post(`${this.api}/login`, this.loginData).subscribe({
      next: (res: any) => {
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
      error: (err) => {
        console.error('Login error:', err);
        alert(err.error?.message || 'Login failed.');
      }
    });
  }

  onRegister(form: NgForm) {
    if (form.invalid) return;

    this.http.post(`${this.api}/register`, this.registerData).subscribe({
      next: (res: any) => {
        alert(res.message);
        localStorage.setItem('user', JSON.stringify({
          name: this.registerData.name,
          email: this.registerData.email
        }));
        this.toggleMode(); // Switch to login mode after register
      },
      error: (err) => {
        console.error('Register error:', err);
        alert(err.error?.message || 'Registration failed.');
      }
    });
  }
}
