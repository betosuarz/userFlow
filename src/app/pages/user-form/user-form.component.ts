import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  activatedRoute = inject(ActivatedRoute)
  
  formTitle: string = 'Nuevo registro de usuario';


  constructor() {
    this.usersForm = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/)
      ]),
    }, []);
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.formTitle = 'Modificación de datos de usuario';
        const response = await this.usersService.getById(params.id);
        this.usersForm = new FormGroup({
          _id: new FormControl(response._id, []),
          first_name: new FormControl(response.first_name, []),
          last_name: new FormControl(response.last_name, []),
          email: new FormControl(response.email, []),
          username: new FormControl(response.username, []),
          password: new FormControl(response.password, []),
        }, []);
      }
    });
  }
    // UPDATE
  async getDataForm() {
    if (this.usersForm.value._id) {
      const response = await this.usersService.update(this.usersForm.value);
      console.log(response);
      if (response.id) {
        alert(`El usuario ${response.first_name.toUpperCase()} se ha actualizado correctamente`)
        this.router.navigate(['/users']);
      } else {
        alert('"Error": El usuario que intentas editar no existe');
      }

    // CREATE
    } else {
      const response = await this.usersService.create(this.usersForm.value);
      if (response.id) {
        alert(`El usuario ${response.first_name.toUpperCase()} ha sido creado correctamente`)
        console.log(response);
        this.router.navigate(['/users']);
      } else {
        alert('Ha ocurrido un error al crear el usuario. Inténtalo de nuevo.');
      }
    }
  }

  checkControl (formControlName: string, error: string): boolean | undefined {
    return this.usersForm.get(formControlName)?.hasError(error) && this.usersForm.get(formControlName)?.touched
  }
}