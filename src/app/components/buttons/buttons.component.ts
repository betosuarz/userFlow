import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {

  @Input() parent: string = "";
  @Input() idUser: string = "";
  usersService = inject(UsersService);

  async deleteUser(id: string) {
    let confirmation = confirm('¿Estás seguro de que quieres eliminar el usuario ' + this.idUser + '?')
    if (confirmation) {
      let response = await this.usersService.delete(id);
      if (response._id) {
        alert('Se ha borrado el usuario ' + response.first_name.toUpperCase() + ' satisfactoriamente');
      } else {
        alert('"Error": El usuario ' + this.idUser + ' que intentas borrar no existe');
      }
      console.log(response);

    }
  }
  
}
