import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  unUser!: IUser;


  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const _id = Number(params._id);
      try {
        let response = await this.usersService.getById(_id);
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    });
  }
}
