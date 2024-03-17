import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

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
  usersService = inject(UsersService);
  router = inject(Router)

  constructor() {
    this.usersForm = new FormGroup({
      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      email: new FormControl('', []),
      username: new FormControl('', []),
      password: new FormControl('', []),
  }, []);
  }

  async getDataForm() {
    const response = await this.usersService.create(this.usersForm.value);
    if (response.id) {
      alert('El usuario ${response.first_name.toUpperCase} ha sido creado correctamente');
      this.router.navigate(['/users']);
    } else {
      alert('Ha ocurrido un error al crear el usuario. Inténtalo de nuevo.');
    }
  }
}
