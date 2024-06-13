import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl ='http://localhost:8080';

  constructor(private http: HttpClient) { }

  public UserExist(mail: string, pwd: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/userExist?mail=${mail}&pwd=${pwd}`);
  }


}
