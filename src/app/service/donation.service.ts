import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {donation} from "../model/donation.model";

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private baseUrl ='http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getAllDonations(): Observable<Array<donation>>{
    return this.http.get<Array<donation>>(`${this.baseUrl}/getallDonation`)
  }

  public getDonationById(id: number): Observable<donation>{
    return this.http.get<donation>(`${this.baseUrl}/getDonationById/${id}`)
  }
}
