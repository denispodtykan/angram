import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@services';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

	public form: FormGroup;
	public errorMessage: string;

    constructor(
		private router: Router,
		private fb: FormBuilder,
		private userService: UserService
	) { }

    ngOnInit() {
		this.initForm();
    }

	initForm(){
		this.form = this.fb.group({
			username: [null, [Validators.required, Validators.minLength(3)]],
			password: [null, [Validators.required, Validators.minLength(3)]],
		});
	}

	submit(){
		console.log(this.form)
		if (this.form.invalid) {
            this.errorMessage = 'Заполните обязательные поля.';
            return;
        }
		let {username, password } = this.form.value; 
		
		if(this.userService.signUp(username, password)){
			this.router.navigate(['/chat']);
		}else{
			this.errorMessage = 'пользователь уже есть';
		}
	}

	clearError(){
		this.errorMessage = "";
	}
  
}
