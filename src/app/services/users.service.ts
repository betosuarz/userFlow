import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient)
  private baseUrl = 'https://peticiones.online/api/users';

  getAll(): Promise<any>
  {
  return lastValueFrom(this.httpClient.get<any>(this.baseUrl))
  }
  
}
