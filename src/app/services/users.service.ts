import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  oneUser!: IUser;
  private httpClient = inject(HttpClient)
  private baseUrl = 'https://peticiones.online/api/users';

  getAll(): Promise<any>
  {
  return lastValueFrom(this.httpClient.get<any>(this.baseUrl))
  }

  getById(_id:string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${_id}`))
  }

  delete(_id: string): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${_id}`))
  }
}
