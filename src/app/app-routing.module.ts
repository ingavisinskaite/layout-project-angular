import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WidgetFormComponent } from './components/widget-form/widget-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'widget-form', component: WidgetFormComponent },
  { path: 'widget-form/:id', component: WidgetFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/:type', component: DashboardComponent },
  { path: '', component: DashboardComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
