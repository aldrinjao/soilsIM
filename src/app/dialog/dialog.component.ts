import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public textContent = 'default content';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    console.log('this.data :>> ', this.data);
  }
  toggleSelected(e): void {

    this.clear();
    // loop trough all the items
    for (let index = 1; index <= 5; index++) {

      const element = index;
      if (e !== index) {
        document.getElementById(element.toString()).classList.add('notselected');

      }
    }
    document.getElementById(e).classList.add('selected');
  }

  test2(e): any {
    this.textContent = e.description;
    this.toggleSelected(e.picId);

  }
  clear(): any {
    for (let index = 1; index <= 5; index++) {
      const element = index;
      document.getElementById(element.toString()).classList.remove('selected');
      document.getElementById(element.toString()).classList.remove('notselected');

    }
  }
}
