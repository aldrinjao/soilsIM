import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent, Layer, MapOptions, tileLayer, latLng, control } from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { DialogComponent } from './dialog/dialog.component';
import { domain } from 'process';
import { Soilprofile } from './soilprofile';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { element } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})



export class AppComponent {

  items: Observable<any[]>;
  test = [];
  allData = [];



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
    center: latLng(13, 120),
    zoomControl: false
  };


  public testObject: Soilprofile[];



  public map: Map;
  public zoom: number;
  public dialogReftest;

  public rotateIcon = L.icon({
    iconSize: [30, 30],
    iconAnchor: [0, 20],
    // specify the path here
    iconUrl: './assets/pin2.png'
  });


  public defIcon = L.icon({
    iconSize: [30, 30],
    iconAnchor: [0, 20],
    // specify the path here
    iconUrl: './assets/pin.png'
  })


  constructor(public dialog: MatDialog, private zone: NgZone, db: AngularFireDatabase) {

    this.items = db.list('items').valueChanges();


    const myObserver = {
      next: x => {
        x.forEach(sample => {
          const tempObject = {
            // insert the id too
            item_id: sample.item_id,
            loc_id: sample.loc_id,
            location_name: sample.location_name,
            lat: sample.lat,
            long: sample.long,
            order: sample.order,
            description: sample.description,
            depth: sample.depth,
            picUrl: sample.picUrl,
            crop: sample.crop,
            elevation: sample.elevation,
            relief: sample.relief,
            parent_material: sample.parent_material,
            drainage: sample.drainage,
            collaborator: sample.collaborator,
            soil_sample_num: sample.soil_sample_num,
            date_of_sampling: sample.date_of_sampling,
            described_by: sample.described_by,
            horizon: sample.horizon,
            pdfUrl: sample.pdfUrl



          };
          this.test.push(tempObject);
        });


        // make calls here
        this.buildObjects(this.test);
        this.buildMarkers();


      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),


    };

    this.items.subscribe(myObserver);

    this.testObject = [
      {
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


  buildObjects(rows): any {
    const categories = [...new Set(this.test.map(t => t.loc_id))];
    const filtered = [];

    // tslint:disable-next-line: no-shadowed-variable
    categories.forEach(element => {
      const temp = this.test.filter(item => {
        return item.loc_id === element;
      });
      filtered.push(temp);
    });

    this.allData = filtered;
    console.log('this.allData :>> ', this.allData);
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
    control.zoom({
      position: 'topright'
    }).addTo(map);

  }

  onMapZoomEnd(e: ZoomAnimEvent): any {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

  buildMarkers(): any {

    for (const elemente of this.allData) {
      const latitude = elemente[0].lat;
      const longitude = elemente[0].long;

      const markerOptions = {
        icon: this.defIcon
      }



      const tempMarker = L.marker([latitude, longitude], markerOptions).addEventListener('click',
        () => {
          this.zone.run(() => { this.openDialog(elemente); });
        });
      tempMarker.addEventListener('mouseover',
        () => {
          tempMarker.setIcon(this.rotateIcon);
        });

      tempMarker.addEventListener('mouseout',
        () => {
          tempMarker.setIcon(this.defIcon);
        });
      tempMarker.addTo(this.map)
    }

  }





  openDialog(soilData): any {
    this.dialogReftest = this.dialog.open(DialogComponent, {
      data: soilData
    });
    this.dialogReftest.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

