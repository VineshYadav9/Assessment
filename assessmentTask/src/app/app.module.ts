import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootstrapModalModule } from './common/bootstrap-modal/bootstrap-modal.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BootstrapModalModule.forRoot({container:document.body})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
