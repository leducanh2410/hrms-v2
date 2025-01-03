import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  NgForm,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
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
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  // @ViewChild('signInNgForm') signInNgForm: NgForm;

  signInForm!: UntypedFormGroup;
  showAlert: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    // private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router
  ) // private _deviceDetectorService: DeviceDetectorService
  {}
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      // otp: [''],
      rememberMe: [''],
    });

    // let deviceId = localStorage.getItem("DEVICE_ID") || '';
    // if (deviceId.length == 0) {
    //     deviceId = uuid.v4();
    //     localStorage.setItem("DEVICE_ID", deviceId);
    // }
    // this.deviceInfo = this._deviceDetectorService.getDeviceInfo();

    // this._captchaService.captchStatus.subscribe((status) => {
    //     if (status != null) {
    //         if (status) {
    //             this.captchaStatus = 1;
    //         } else {
    //             this.captchaStatus = 0;
    //         }
    //     }
    // });

    // this.deviceInfoRequest = {
    //     deviceId: deviceId,
    //     deviceType: this.deviceInfo.deviceType,
    //     appId: environment.appId,
    //     appVersion: environment.appVersion,
    //     notificationToken: "",
    //     browser: this.deviceInfo.browser,
    //     browserVersion: this.deviceInfo.browser_version,
    //     operatingSystem: this.deviceInfo.os,
    //     osVersion: this.deviceInfo.os_version
    // }
  }
  /**
   * Sign in
   */
  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // // Disable the form
    this.signInForm.disable();

    // // Hide the alert
    // this.showAlert = false;

    // // TFA
    // if (this.showOTPInput) {
    //     this._authService.validateOTP({
    //         otp: this.signInForm.get('otp').value,
    //         userId: this.signInForm.get('userid').value,
    //         deviceInfo: this.deviceInfoRequest
    //     })
    //         .subscribe((response: any) => {
    //             if (response.status) {
    //                 this.callSignInAPI();
    //             } else {
    //                 this.signInForm.enable();

    //                 // Reset the form
    //                 //this.signInNgForm.resetForm();

    //                 // Set the alert
    //                 this.alert = {
    //                     type: 'error',
    //                     message: response.message
    //                 };
    //                 this.showAlert = true;
    //             }
    //         })
    // } else {
    //     this.callSignInAPI();
    // }
    // this.callSignInAPI(deviceId);
  }
}
