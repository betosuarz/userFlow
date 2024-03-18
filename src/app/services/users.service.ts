import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  oneUser!: IUser;
  private httpClient = inject(HttpClient)
  private baseUrl = 'https://peticiones.online/api/users';

  getAll(page: number): Promise<IUser[]> {
  return lastValueFrom(this.httpClient.get<IUser[]>(`${this.baseUrl}?page=${page}`))
  }
  
  getById(_id:string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`))
  }

  delete(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`))
  }

  create(formValue: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, formValue))
  }

  update(formValue: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${formValue._id}`, formValue))
  }
}
