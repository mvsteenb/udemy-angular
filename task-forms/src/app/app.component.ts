import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') form: NgForm;
  formData : {
    email: '',
    subscription: '',
    password : ''
  }
  
  subscriptions = [
    'Basic',
    'Advanced',
    'Pro'
  ]

  defaultSubscription = 'Advanced';

  onSubmit(form: NgForm) {
    console.log(form);

    this.formData = {    
      email : form.value.email,
      password : form.value.password,
      subscription : form.value.subscription
    }

    form.reset();
  }

}
