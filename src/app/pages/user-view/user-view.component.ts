import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ButtonsComponent } from '../../components/buttons/buttons.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink, ButtonsComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  // private activatedRoute = inject(ActivatedRoute);
  // private usersService = inject(UsersService);
  
  constructor(
      private activatedRoute: ActivatedRoute,
      private usersService: UsersService
    ) {}
  oneUser!: IUser | undefined;


  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = params.iduser;
      try {
        this.oneUser = await this.usersService.getById(id);
      } catch (error) {
        console.log('"Error": No se ha podido recuperar el usuario ' + id);
      }
    });
  }
}
