import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HomeResolver } from './pages/home/services/home.resolver';

const routes: Routes = [
  {
    path: '', component: HomeComponent, resolve: {
      home: HomeResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
