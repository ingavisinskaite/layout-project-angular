import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { MenuComponent } from "./components/menu/menu.component";
import { TableWidgetComponent } from "./components/table-widget/table-widget.component";
import { MessagesWidgetComponent } from "./components/messaging-widget/messaging-widget.component";
import { AppDataService } from "./services/app-data.service";
import { WidgetFormComponent } from "./components/widget-form/widget-form.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidenavComponent,
    MenuComponent,
    TableWidgetComponent,
    MessagesWidgetComponent,
    WidgetFormComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [AppDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
