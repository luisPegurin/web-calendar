import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators  } from '@angular/forms';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


	registerForm = this.fb.group({
		email: [ '', [Validators.email, Validators.required] ],
		password: ['',Validators.required]
	});

	constructor(
		private fb: FormBuilder,
		private authService:  AuthService,
		private router: Router) { }

	ngOnInit(): void {
	}

	onSubmit() {
		if (this.registerForm.valid ) {
			this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password)
			.subscribe((result) => {
				this.router.navigate(['/calendar']);
			}, (error) => {
				console.log('Erro na requisição.',error);
			})
		}
	}

}
