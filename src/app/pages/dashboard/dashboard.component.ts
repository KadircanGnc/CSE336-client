import { Component, inject, OnInit } from '@angular/core';
import { BusStopService } from '../../services/bus-stop.service';
import * as L from 'leaflet';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { GetBoardings_WC_MLS_Response, GetBusStops_WC_MLS_Response } from '../../types/types';
import { FormsModule } from '@angular/forms';
import { BoardingsService } from '../../services/boardings.service';

// Fix for missing marker icons
const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private map: L.Map | undefined;
  multi: any[] =[];
  view: any[] = [700, 400];  

  // Define colorScheme as a valid Color object
  colorScheme: Color = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal
  };

  private busStopService = inject(BusStopService);
  private boardingsService = inject(BoardingsService);

  ngOnInit(): void {
    this.loadBusStopData();
    this.loadBoardingData();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {    

    this.map = L.map('map').setView([36.884804, 30.704044], 13); // Set the initial view of the map

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  private loadBusStopData(): void {
    this.busStopService.getBusStops().subscribe((data) => {
      data.content.forEach((busStop: GetBusStops_WC_MLS_Response) => {
        if (this.map) {
          // Add a marker for each bus stop
          L.marker([busStop.latitude, busStop.longitude])
            .addTo(this.map)
            .bindPopup(`<b>${busStop.stopName}</b><br>Lat: ${busStop.latitude}, Lng: ${busStop.longitude}`);
        }
      });
    });
  }

  private loadBoardingData(): void {
    this.boardingsService.getBoardings().subscribe((data) => {
      data.content.forEach((boarding: GetBoardings_WC_MLS_Response) => {
        if (this.map) {
          // Add a circle for each boarding
          L.circle([boarding.latitude, boarding.longitude], {
            color: 'blue',
            fillColor: '#30a3dc',
            fillOpacity: 0.5,
            radius: 50 // Adjust the radius as needed
          })
            .addTo(this.map)
            .bindPopup(`<b>Boarding</b><br>Lat: ${boarding.latitude}, Lng: ${boarding.longitude}`);
        }
      });
    });
  }

}