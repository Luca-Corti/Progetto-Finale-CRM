import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;

 async submitForm() {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      try{
        await this.authSrv.signup(this.validateForm.value).toPromise()
      }
      catch(error){console.log(error)}
      this.router.navigate(['/login'])
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private router:Router, private authSrv:AuthService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      username: [null, [Validators.required]],

    });
  }

}
