import { Component } from '@angular/core';
import { Campaign } from './interfaces/inspiration-data';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  campaignList: Campaign[] = []

  constructor(private dataService: DataService){
    this.dataService.getInspirationData()
    this.dataService.getCampaigns()
  }

  ngOnInit() {
    this.dataService.campaignList$.subscribe(campaigns => {
      this.campaignList = campaigns
    })
  }

  goToCampaign(c: Campaign) {
    this.dataService.navToCampaign(c)
  }
}
