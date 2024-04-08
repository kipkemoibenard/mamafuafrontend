import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { LandingScreenComponent } from './components/landing-screen/landing-screen.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    LandingScreenComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    ButtonModule
  ]
})
export class HomepageModule { }
