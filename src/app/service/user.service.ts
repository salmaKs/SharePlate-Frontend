import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {gouvTun, role, user} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl ='http://localhost:8080';

  constructor(private http: HttpClient) { }

  public UserExist(mail: string, pwd: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/userExist?mail=${mail}&pwd=${pwd}`);
  }

  public userByGouv(gouvTun: gouvTun):Observable<Array<user>>{
    return this.http.get<Array<user>>(`${this.baseUrl}/getUserByGouv?gouvTun=`+ gouvTun);
  }
  public userByRole(role: role): Observable<Array<user>>{
    return this.http.get<Array<user>>(`${this.baseUrl}/getUserByRole?role=`+role);
  }

  public addUser(user: user): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUser`, user);
  }
  public userExistAll(user: user): Observable<boolean> {
    const params = new HttpParams({ fromObject: { user: JSON.stringify(user) } });
    return this.http.get<boolean>(`${this.baseUrl}/allexist`, { params });
  }




}
