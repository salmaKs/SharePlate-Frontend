import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {receipt} from "../model/receipt.model";
import {Observable} from "rxjs";
import {donation} from "../model/donation.model";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private baseUrl ='http://localhost:8080';
  constructor(private http:HttpClient) { }

  public addReceipt(receipt: {
    unit: string;
    quantity: number;
    dateReceived: Date
  }, id: number): Observable<receipt> {
    // @ts-ignore
    return this.http.post<receipt>(`${this.baseUrl}/addReceipt/${id}`, receipt);
  }
  public getAllReceipt(): Observable<Array<receipt>> {
    return this.http.get<Array<receipt>>(`${this.baseUrl}/getallReceipt`);
  }
  public getReceiptByDate(dateR: Date): Observable<Array<receipt>>{
    return this.http.get<Array<receipt>>(`${this.baseUrl}/getReceiptByDate?dateR=`+ dateR);
  }

  public deleteReceipt(id: number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/deleteReceipt/${id}`);
  }
}
