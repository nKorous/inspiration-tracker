import { DataService } from './../services/data.service';
import { InspirationData } from './../interfaces/inspiration-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inspiration-home',
  templateUrl: './inspiration-home.component.html',
  styleUrls: ['./inspiration-home.component.css']
})
export class InspirationHomeComponent implements OnInit {

  inspirationData: InspirationData[] = [
    { playerKey: 1, realName: 'Nate', playerName: 'Dr. Kjytt', inspOne: true, inspTwo: true, inspThree: false, inspFour: false, inspFive: false },
    { playerKey: 2, realName: 'Trent', playerName: 'Lucian', inspOne: false, inspTwo: false, inspThree: false, inspFour: false, inspFive: false },
    { playerKey: 3, realName: 'Todd', playerName: 'Kilik', inspOne: false, inspTwo: false, inspThree: false, inspFour: false, inspFive: false },
    { playerKey: 4, realName: 'Tyler', playerName: 'Escanore', inspOne: false, inspTwo: false, inspThree: false, inspFour: false, inspFive: false },
    { playerKey: 5, realName: 'Hunter', playerName: 'Dathorin', inspOne: false, inspTwo: false, inspThree: false, inspFour: false, inspFive: false }
  ]

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getInspirationData()
  }

  getInspirationData() {
    this.dataService.inspirationData$.subscribe(data => this.inspirationData = data)
  }

  rowUpdated(e) {
    this.dataService.updateInspiration(e.data)
  }

}

