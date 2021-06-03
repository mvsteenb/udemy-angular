import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') form: NgForm;
  defaultQuestion = 'teacher';
  answer : string = '';
  genders = ['male', 'female'];

  submitted = false;

  user = {
    username: '',
    email: '',
    secret: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret : 'pet',
    //   questionAnswer : '',
    //   gender : 'male'
    // });
    this.form.form.patchValue(
      {
        userData : {
          username: suggestedName
        },
        secret : 'pet'
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.user.username = this.form.value.userData.username;
    this.user.email = this.form.value.userData.email;
    this.user.secretQuestion = this.form.value.secret;
    this.user.answer = this.form.value.questionAnswer;
    this.user.gender = this.form.value.gender;
    this.submitted = true;

    this.form.reset();
  }
}
