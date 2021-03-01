/** 
* @author  Umesh Singh Yadav
* @version 1.0
* @since   2017-03-01 
*/
import { NgModule } from "@angular/core";
import { ConfirmComponent } from './confirm-modal';
import { BootstrapModalModule } from '../bootstrap-modal/bootstrap-modal.module';

@NgModule({
  declarations: [
    ConfirmComponent
  ],
  imports :[
    BootstrapModalModule
  ],
  exports: [
    ConfirmComponent
  ],
	entryComponents: [ConfirmComponent],
  providers: []
})
export class ConfirmModalModule {
  static forRoot() {
    return {
      ngModule: ConfirmModalModule,
      providers: []
    }
  }
}
