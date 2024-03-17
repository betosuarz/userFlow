import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  type: string = 'new';
  usersForm: FormGroup;

  constructor() {
    this.usersForm = new FormGroup({
      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      email: new FormControl('', []),
      username: new FormControl('', []),
      password: new FormControl('', []),
  }, []);
  }

  getDataForm() {
    console.log(this.usersForm.value);
  }
}
