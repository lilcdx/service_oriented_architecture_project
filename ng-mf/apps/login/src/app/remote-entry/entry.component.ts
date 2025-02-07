import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '@ng-mf/data-access-user';
import { inject } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'ng-mf-login-entry',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class RemoteEntryComponent {
  private userService = inject(UserService);
  username = '';
  password = '';
  isSignUpMode = false;
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  login() {
    this.userService.login(this.username, this.password);
  }

  createAccount() {
    this.userService.createUser(this.username, this.password ).subscribe({
      next: (response) => {
        console.log('Account created successfully!', response);
        this.login(); // ✅ Automatically log in after creating the account
      },
      error: (err) => {
        console.error('Account creation failed', err);
      },
    });
  }

  toggleMode() {
    this.isSignUpMode = !this.isSignUpMode;
  }
}