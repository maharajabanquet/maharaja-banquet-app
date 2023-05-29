import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isAdmin = false;
  userLogin: any;
  constructor() {
    this.userLogin = JSON.parse(localStorage.getItem('user'))
    this.isAdmin = this.userLogin && this.userLogin.isAdmin
    console.log('LALALLA');
    
  }

}
