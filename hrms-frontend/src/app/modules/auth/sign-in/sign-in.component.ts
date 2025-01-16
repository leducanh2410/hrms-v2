import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/authURL';

@Component({
  selector: 'app-sign-in',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  // FormGroup,
  // FormBuilder,
  ReactiveFormsModule,
  MatInputModule,
  RouterModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit{
  signInForm!: UntypedFormGroup;
  showAlert: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    // private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    // private _deviceDetectorService: DeviceDetectorService
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      // otp: [''],
    });

  
  }
  /**
   * Sign in
   */
  signIn(): void {
    // Return if the form is invalid
    // if (this.signInForm.invalid) {
    //     return;
    // }

    // // Disable the form
    // this.signInForm.disable();

    if (this.signInForm.invalid) {
      return;
    }

    const { email, password } = this.signInForm.value;

    // Gửi yêu cầu login qua AuthService
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        alert('Đăng nhập thành công!');
        // Lưu token hoặc thông tin vào localStorage nếu cần
        localStorage.setItem('authToken', response.data.token);
        this._router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    );
  }
}
