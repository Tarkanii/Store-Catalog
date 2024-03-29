import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, button?: string, navigateLink: string },
    public dialog: MatDialogRef<InfoDialogComponent>
  ) { }

  ngOnInit(): void {
  }

}
