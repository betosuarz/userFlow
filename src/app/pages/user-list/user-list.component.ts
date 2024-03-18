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
  currentPage: number = 1;
  totalPages: number = 2; 
  arrUsers: IUser[] = [];

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  async loadUsers(page: number): Promise<void> {
    try {
      const users: any = await this.usersService.getAll(page); 
      this.arrUsers = users.results;
      console.log(this.arrUsers);
      this.totalPages = users.total_pages;
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  }

  async nextPage(): Promise<void> {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      await this.loadUsers(this.currentPage);
    }
  }

  async prevPage(): Promise<void> {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.loadUsers(this.currentPage);
    }
  }
}
