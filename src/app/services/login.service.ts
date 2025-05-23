import { Injectable } from '@angular/core';
import { Environment } from '../environments/environment';
import { Response } from '../models/response';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
readonly apiUrl=Environment.backendUrl+"login"
  constructor(private http:HttpClient) { }

  login(user:User){
    return this.http.post(this.apiUrl + "/iniciar_sesion",user)
  }
}
