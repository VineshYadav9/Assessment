import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './api/http-api.service';
import { HttpJsonService } from './api/http-json-api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    HttpService,
    HttpJsonService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    // throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}