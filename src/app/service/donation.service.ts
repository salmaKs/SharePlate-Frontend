import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {donation, donationType} from "../model/donation.model";
import {user} from "../model/user.model";

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

  public addDonation(donation: donation, CIN: number): Observable<any>{
    return this.http.post(`${this.baseUrl}/addDonation/${CIN}`, donation);
  }

  public getDonationByType(type: donationType): Observable<Array<donation>>{
    return this.http.get<Array<donation>>(`${this.baseUrl}/getDonationByType?donationType=`+type);
  }

  public getAllDonationByCin (CIN: number):Observable<Array<donation>>{
    return this.http.get<Array<donation>>(`${this.baseUrl}/getDonationByCin/${CIN}`);
  }

  public deleteDonation(id: number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/deleteDonation/${id}`);
  }
}
