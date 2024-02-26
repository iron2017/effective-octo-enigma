import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
//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
  form: FormGroup = new FormGroup({
    
    username: new FormControl(''),
    password: new FormControl(''),
    
  });
  constructor(private authService: AuthService,private router:Router,private formBuilder: FormBuilder) {}
ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
       
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
 
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        
      }
    );
  }
  login() {

      console.log(JSON.stringify(this.form.value, null, 2));
    this.authService.login("this.username", "this.password")
      .subscribe(
        (response:any) => {
          // Handle successful login
          console.log('Login successful', response);
         // this.router.navigate(['/home']);
        },
        (error:any) => {
          // Handle login error
          console.error('Login error', error);
          this.router.navigate(['/home']);
          
        }
      );
  }
}
