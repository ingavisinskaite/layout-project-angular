import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { WidgetFormComponent } from "./components/widget-form/widget-form.component";

const routes: Routes = [
  { path: "messaging", component: DashboardComponent },
  { path: "widget-form", component: WidgetFormComponent },
  { path: "widget-form/:id", component: WidgetFormComponent },
  { path: "", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
