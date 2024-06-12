import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.css']
})
export class LandingScreenComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.router.navigate(['home']);
        }
      },
      {
        label: 'Services',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'House Cleaning Services',
          },
          {
            label: 'Laundry and Dry Cleaning Services',
          },
          {
            label: 'Window Cleaning Services',
          }
          ,
          {
            label: 'Carpet and Upholstery Cleaning Services',
          }
          ,
          {
            label: 'Specialized Cleaning Services',
          },
          {
            label: 'Learn more...',
            command: () => {
              this.router.navigate(['home/client/cleaning-services']);
            }
          }
        ]
      },
      {
        label: 'Get our services',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Register/Login',
            icon: 'pi pi-fw pi-user-plus',
            command: () => {
              this.router.navigate(['home/client/login']);
            }
          },
        ]
      },
      {
        label: 'Service provider',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Register/Login',
            icon: 'pi pi-fw pi-user-plus',
            command: () => {
              this.router.navigate(['home/mamafua/login']);
            }
          },
        ]
      },
      {
        label: 'Contact us',
        icon: 'pi pi-fw pi-phone',
        items: [
          {
            label: '0722222222',
            icon: 'pi pi-fw pi-phone',
          },
          {
            label: 'mamafua@gmail.com',
            icon: 'pi pi-fw pi-envelope',
          },
        ]
      },
      // {
      //   label: 'Quit',
      //   icon: 'pi pi-fw pi-power-off'
      // }
    ];
  }


}