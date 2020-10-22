import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public textContent = 'default content';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  filtered: any = [];
  depth: string;
  latitude: number;
  longitude: number;
  locname: string;
  description: string;
  dateOfSampling: string;
  elevation: string;
  relief: string;
  parentMaterial: string;
  collaborator: string;
  soilSampleNum: string;
  describedBy: string;
  drainage: string;
  itemId: number;
  images: any = [];
  depthFlag: boolean;
  horizon: string;
  soilSeries: string;
  splitCrops: any = [];
  pdfUrl: string;



  ngOnInit(): void {
    const crops = [...new Set(this.data.map(t => t.crop))];
    let imagecont = [];
    const imagecont2 = [];
    this.depthFlag = false;
    crops.forEach(crop => {

      const temp = this.data.filter(item => {
        return item.crop === crop;
      });
      this.filtered.push(temp);

    });

    this.itemId = this.filtered[0][0].item_id;
    this.depth = this.filtered[0][0].depth;
    this.latitude = this.filtered[0][0].lat;
    this.longitude = this.filtered[0][0].long;
    this.locname = this.filtered[0][0].location_name;
    this.textContent = this.filtered[0][0].description;
    this.dateOfSampling = this.filtered[0][0].date_of_sampling;
    this.elevation = this.filtered[0][0].elevation;
    this.relief = this.filtered[0][0].relief;
    this.parentMaterial = this.filtered[0][0].parent_material;
    this.collaborator = this.filtered[0][0].collaborator;
    this.soilSampleNum = this.filtered[0][0].soil_sample_num;
    this.describedBy = this.filtered[0][0].described_by;
    this.drainage = this.filtered[0][0].drainage;
    this.soilSeries = this.filtered[0][0].soil_series;
    this.splitCrops = this.filtered[0][0].crop.split(',');
    this.pdfUrl = this.filtered[0][0].pdfUrl;

    this.filtered.forEach(i => {
      imagecont = [];
      i.forEach(im => {
        if (im.order !== 0) {
          imagecont.push(im);
        }
      });
      imagecont.sort((a, b) => a.order - b.order);
      imagecont2.push(imagecont);
    });
    this.splitCrops = this.splitCrops.map(s => s.trim());

    // console.log('this.images :>> ', this.splitCrops);
    this.images = imagecont2;
  }



  toggleSelected(e): void {

    this.clear();
    // loop trough all the items
    this.images[0].forEach(element => {

      if (e !== element.item_id) {
        const i = 'img_' + element.item_id;
        document.getElementById(i).classList.add('notselected');

      } else {
        document.getElementById('img_' + e).classList.add('selected');
        this.textContent = element.description;
        this.depth = element.depth;
        this.horizon = element.horizon;
        // console.log('element.description :>> ', element.description);
      }
    });

  }

  highlight(e): any {
    this.toggleSelected(e);
    this.depthFlag = true;
  }


  clear(): any {

    this.images[0].forEach(e => {


      document.getElementById('img_' + e.item_id).classList.remove('selected');
      document.getElementById('img_' + e.item_id).classList.remove('notselected');

    });

    this.depthFlag = false;
  }

  downloadPdf(): any {
    window.open(this.pdfUrl, '_blank');
  }

}
