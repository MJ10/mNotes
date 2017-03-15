import { Component } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  isLoggedIn:boolean;
  canGoBack:boolean;

  constructor(private af: AngularFire, private router: Router) {
    this.af.auth.subscribe((auth) => {
      if(auth) {
        this.isLoggedIn = true;
      }
    });
  }

  onLogoutClicked() {
    this.af.auth.logout().then((res) => {
      this.isLoggedIn = false;
      this.router.navigateByUrl('login');
    });

  }
}
