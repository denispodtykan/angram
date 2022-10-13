import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@services';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
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
		if (this.form.invalid) {
            this.errorMessage = 'Заполните обязательные поля.';
            return;
        }
		
		if(this.userService.signIn(this.form.value)){
			this.router.navigate(['/chat']);
		}else{
			this.errorMessage = 'пользователь не найден';
		}
	}

	clearError(){
		this.errorMessage = "";
	}
}
