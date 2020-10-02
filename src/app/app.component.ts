import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent, Layer, MapOptions, tileLayer, latLng } from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { DialogComponent } from './dialog/dialog.component';
import { domain } from 'process';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  @Output() map$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Input() options: MapOptions = {

    layers: [tileLayer('http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}', {
      opacity: 1,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom: 6,
    center: latLng(13, 120)
  };


  public icon = {
    icon: L.icon({
      iconSize: [30, 30],
      iconAnchor: [0, 0],
      // specify the path here
      iconUrl: './assets/pin.png'
    })
  };


  public map: Map;
  public zoom: number;
  public dialogReftest;

  constructor(public dialog: MatDialog, private zone: NgZone) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): any {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): any {


    this.map.clearAllEventListeners();
    this.map.remove();
  }

  onMapReady(map: Map): any {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);


    // const marker = L.marker([12, 120.09], this.icon).on('click', (e) => {
    //   this.dialog.open(DialogComponent);

    // }

    // ).addTo(map);


    const test = L.marker([12, 120.09], this.icon).addEventListener('click',
      () => {
        this.zone.run(() => { this.openDialog(); });
      }).addTo(map);

  }

  onMapZoomEnd(e: ZoomAnimEvent): any {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }





  openDialog(): any {
    this.dialogReftest = this.dialog.open(DialogComponent, {
      data: {
        dataKey: 'a'
      }
    });
    this.dialogReftest.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

