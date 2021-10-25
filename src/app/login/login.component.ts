import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators  } from '@angular/forms';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 	showError = false;

	loginForm = this.fb.group({
		email: [ '', [Validators.email, Validators.required] ],
		password: ['',Validators.required]
	});
	constructor(
		private fb: FormBuilder	,
		private authService:  AuthService,
		private router: Router ) {
    }

  ngOnInit(): void {
  }

  onSubmit() {
  	if (this.loginForm.valid ) {
  		this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
  			.subscribe((result) => {
  				this.router.navigate(['/calendar']);
   			}, (error) => {
   				this.showError = true;
  				console.log('Erro na requisição.',error);
   			})
  	}
  }

}
