import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  error: boolean = false;

  submitForm() {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.authSrv.login(this.validateForm.value).subscribe(data => {
        environment.userToken = data.accessToken
        let json = JSON.stringify(data);
        localStorage.setItem("user", json);
        this.router.navigate(['/home'])
      }, error => {
        console.log(error);
        this.error = true;
      })
    }
    else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
