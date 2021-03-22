import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Campaign, InspirationData, NewPlayer } from '../interfaces/inspiration-data';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const BASE_URL = environment.endpoint

@Injectable({
  providedIn: 'root'
})
export class DataService {
  inspirationData$: BehaviorSubject<InspirationData[]> = new BehaviorSubject([])
  campaignList$: BehaviorSubject<Campaign[]> = new BehaviorSubject([])

  selectedCampaign$: BehaviorSubject<Campaign> = new BehaviorSubject(null)


  constructor(private http: HttpClient,
    private router: Router) {}

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

  getCampaigns(){
    this.http.get<Campaign[]>(BASE_URL + '/api/getCampaigns').subscribe(response => {
      this.campaignList$.next(response)
    })
  }

  updateInspiration(data: InspirationData){
    this.http.post<any>(BASE_URL + '/api/updateInspiration', data).subscribe(response => {
      this.getInspirationData()
    })
  }

  addPlayer(data: NewPlayer) {
    this.http.post<any>(BASE_URL + '/api/addPlayer', data).subscribe(data => {
      this.getInspirationData()
    })
  }

  navToCampaign(c: Campaign){
    this.selectedCampaign$.next(c)
    this.router.navigate([`/campaign/${c.campaignKey}`])
  }
}
