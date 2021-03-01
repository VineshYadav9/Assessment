/** 
* @author  Umesh Singh Yadav
* @version 1.0
* @since   2017-03-01 
*/
import { Component } from '@angular/core';
import {DialogService } from "../bootstrap-modal/dialog.service";
import { DialogComponent } from "../bootstrap-modal/dialog.component";


export interface ConfirmModel {
  title:string;
  message:string;
}

@Component({
  selector: 'confirm',
  templateUrl: './confirmation-modal.html'
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  public title: string;
  public message: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }
}


