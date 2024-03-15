import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';
  
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  usersService = inject(UsersService)
  arrUsers: IUser[] = [];
  
  async ngOnInit(): Promise<void> {
    try{
      await this.usersService.getAll().then((res) => {
        this.arrUsers = res.results
        console.log(this.arrUsers)
      },
    (error) => {
      console.error('Error:', error);
    });
    }
    catch(error){
      console.error('Error al obtener los nombres de usuario:', error);
    }
  }
}