import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.css']
})
export class LandingScreenComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}

    ngOnInit() {
      
    }

    navigate() {
      this.router.navigate(['home/client/dashboard']);
    }

    navigate1() {
      this.router.navigate(['home/mamafua/dashboard']);
    }

   
}