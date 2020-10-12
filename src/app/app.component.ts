import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent, Layer, MapOptions, tileLayer, latLng } from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { DialogComponent } from './dialog/dialog.component';
import { domain } from 'process';
import { Soilprofile } from './soilprofile';


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


  public testObject: Soilprofile[];

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

  constructor(public dialog: MatDialog, private zone: NgZone) {

    this.testObject = [{
      id: 1,
      name: 'Manila',
      crop: 'rice',
      long: 120.222,
      lat: 14.111,
      images: [
        {
          picId: 1,
          url: '1.jpg',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },

        {
          picId: 2,
          url: '2.jpg',
          description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using  making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
        },
        {
          picId: 3,
          url: '3.jpg',
          description: 'If you want to use text word wrap in your Visual Studio Code editor, you have to press button Alt + Z for text word wrap. Its word wrap is toggled between text wrap or unwrap. Windows: Ctrl + Shift + press the key'
        },
        {
          picId: 4,
          url: '4.jpg',
          description: 'She wholly fat who window extent either formal. Removing welcomed civility or hastened is. Justice elderly but perhaps expense six her are another passage. Full her ten open fond walk not down. For request general express unknown are. He in just mr door body held john down he. So journey greatly or garrets. Draw door kept do so come on open mean. Estimating stimulated how reasonably precaution diminution she simplicity sir but. Questions am sincerity zealously concluded consisted or no gentleman it. s'
        },
        {
          picId: 5,
          url: '5.jpg',
          description: 'Promotion an ourselves up otherwise my. High what each snug rich far yet easy. In companions inhabiting mr principles at insensible do. Heard their sex hoped enjoy vexed child for. Prosperous so occasional assistance it discovered especially no. Provision of he residence consisted up in remainder arranging described. Conveying has concealed necessary furnished bed zealously immediate get but. Terminated as middletons or by instrument. Bred do four so your felt with. No shameless principle dependent household do. '
        }

      ]

    },

    {
      id: 2,
      name: 'SSS',
      crop: 'rice',
      long: 121.222,
      lat: 11.111,
      images: [
        {
          picId: 1,
          url: '1.jpg',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },

        {
          picId: 2,
          url: '2.jpg',
          description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using  making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
        },
        {
          picId: 3,
          url: '3.jpg',
          description: 'If you want to use text word wrap in your Visual Studio Code editor, you have to press button Alt + Z for text word wrap. Its word wrap is toggled between text wrap or unwrap. Windows: Ctrl + Shift + press the key'
        },
        {
          picId: 4,
          url: '4.jpg',
          description: 'She wholly fat who window extent either formal. Removing welcomed civility or hastened is. Justice elderly but perhaps expense six her are another passage. Full her ten open fond walk not down. For request general express unknown are. He in just mr door body held john down he. So journey greatly or garrets. Draw door kept do so come on open mean. Estimating stimulated how reasonably precaution diminution she simplicity sir but. Questions am sincerity zealously concluded consisted or no gentleman it. s'
        },
        {
          picId: 5,
          url: '5.jpg',
          description: 'Promotion an ourselves up otherwise my. High what each snug rich far yet easy. In companions inhabiting mr principles at insensible do. Heard their sex hoped enjoy vexed child for. Prosperous so occasional assistance it discovered especially no. Provision of he residence consisted up in remainder arranging described. Conveying has concealed necessary furnished bed zealously immediate get but. Terminated as middletons or by instrument. Bred do four so your felt with. No shameless principle dependent household do. '
        }

      ]

    }


    ];
  }

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

    for (const element of this.testObject) {
      const latitude = element.lat;
      const longitude = element.long;

      const test = L.marker([latitude, longitude], this.icon).addEventListener('click',
        () => {
          this.zone.run(() => { this.openDialog(element); });
        }).addTo(map);
    }

    // const test = L.marker([12, 120.09], this.icon).addEventListener('click',
    //   () => {
    //     this.zone.run(() => { this.openDialog(); });
    //   }).addTo(map);

  }

  onMapZoomEnd(e: ZoomAnimEvent): any {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }





  openDialog(soilData): any {
    this.dialogReftest = this.dialog.open(DialogComponent, {
      disableClose: true,
      data: soilData
    });
    this.dialogReftest.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

