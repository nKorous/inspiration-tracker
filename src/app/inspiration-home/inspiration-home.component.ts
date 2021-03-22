import { DataService } from './../services/data.service';
import { Campaign, InspirationData } from './../interfaces/inspiration-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inspiration-home',
  templateUrl: './inspiration-home.component.html',
  styleUrls: ['./inspiration-home.component.css']
})
export class InspirationHomeComponent implements OnInit {

  selectedCampaign: Campaign
  inspirationData: InspirationData[] = []

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.selectedCampaign$.subscribe(c => {
      this.selectedCampaign = c
      this.getInspirationData()
    })
  }

  getInspirationData() {

    this.dataService.inspirationData$.subscribe(data => this.inspirationData = data.filter(fi => fi.campaignKey === this.selectedCampaign.campaignKey))
  }

  rowUpdated(e) {
    this.dataService.updateInspiration(e.data)
  }

  rowAdded(e) {
    const newPlayer = {
      realName: e.data.realName,
      playerName: e.data.playerName,
      campaignKey: this.selectedCampaign.campaignKey
    }

    this.dataService.addPlayer(newPlayer)
  }

}

