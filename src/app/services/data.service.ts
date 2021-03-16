import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { InspirationData } from '../interfaces/inspiration-data';
import { BehaviorSubject } from 'rxjs';

const BASE_URL = environment.endpoint

@Injectable({
  providedIn: 'root'
})
export class DataService {
  inspirationData$: BehaviorSubject<InspirationData[]> = new BehaviorSubject([])


  constructor(private http: HttpClient) {}

  getInspirationData() {
    this.http.get<InspirationData[]>(BASE_URL + '/api/getInspiration').subscribe(inspiration => {
      this.inspirationData$.next(inspiration)
    })
  }

  updateInspiration(data: InspirationData){
    this.http.post<any>(BASE_URL + '/api/updateInspiration', data).subscribe(response => {
      this.getInspirationData()
    })
  }
}
