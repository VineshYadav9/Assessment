/** 
* @author  Umesh Singh Yadav
* @version 1.0
* @since   2017-03-01 
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerService } from './pager-service';

import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginationComponent
  ],
  exports: [
    PaginationComponent
  ],
  providers: [PagerService]
})
export class PaginationModule {
}
