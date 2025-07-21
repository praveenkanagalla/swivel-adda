import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: ['./auth-layout.css'],
  template: `<router-outlet></router-outlet>`,
})
export class AuthLayout { }
