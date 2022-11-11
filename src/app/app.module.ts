import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuickstartGuideComponent} from './quickstart-guide/quickstart-guide.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import {EnterpriseOverviewComponent} from './enterprise-overview/enterprise-overview.component';
// enable enterprise features
import 'ag-grid-enterprise';
import { MyCellComponent } from './my-cell/my-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    QuickstartGuideComponent,
    DashboardComponent,
    EnterpriseOverviewComponent,
    MyCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
