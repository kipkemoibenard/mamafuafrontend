import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cleaning-services',
  templateUrl: './cleaning-services.component.html',
  styleUrls: ['./cleaning-services.component.css']
})
export class CleaningServicesComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  back() {
    this.router.navigate(['home']);
  }

  next() {
    this.router.navigate(['/home/client/login']);
  }

}
