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
    this.http.get<any[]>(BASE_URL + '/api/getInspirationData').subscribe(inspiration => {
      const insp = inspiration.map(i => {
        return {
          ...i,
          inspOne: i.inspOne.data[0],
          inspTwo: i.inspTwo.data[0],
          inspThree: i.inspThree.data[0],
          inspFour: i.inspFour.data[0],
          inspFive: i.inspFive.data[0]
        }
      })



      this.inspirationData$.next(insp)
    })
  }

  updateInspiration(data: InspirationData){
    this.http.post<any>(BASE_URL + '/api/updateInspiration', data).subscribe(response => {
      this.getInspirationData()
    })
  }
}
