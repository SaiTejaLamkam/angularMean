import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
public modalData: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    switch (this.data.type) {
      case 'friendRequestConfirmation':
      this.friendRequestConfirmation();
    }
  }

  friendRequestConfirmation() {
    this.modalData = {
      title: 'Friend Request',
      content: 'Are you sure want to send request to' + ' ' + this.data.name
    };
  }

}
