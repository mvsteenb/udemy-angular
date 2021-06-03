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
    console.log(form)
  }
}
