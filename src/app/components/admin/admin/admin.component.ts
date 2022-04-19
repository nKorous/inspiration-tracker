import { Campaign } from './../../../interfaces/inspiration-data';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  campaigns: Campaign[] = []

  newCampaignForm: FormGroup = new FormGroup({
    campaignName: new FormControl('', [Validators.required]),
    dungeonMaster: new FormControl('', [Validators.required])
  })

  newPlayerForm: FormGroup = new FormGroup({
    realName: new FormControl('', [Validators.required]),
    playerName: new FormControl('', [Validators.required]),
  })

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  getCampaigns() {
    this.dataService.campaignList$.subscribe(campaign => this.campaigns = campaign)
  }

  addCampaign() {
    const { value } = this.newCampaignForm

    this.dataService.addCampaign(value)
  }

}
